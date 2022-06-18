local open = io.open
local cjson = require "cjson"


local function read_file(path)
    local file = open(path, "r") -- r read mode and b binary mode
    local content = file:read "*a" -- *a or *all reads the whole file
    return content
end

local function write_file(data, path)
    local file = open(path, "w") -- r read mode and b binary mode
    file:write(data)
    file:close()
end

function scan_dir(directory)
    local i, t = 0, {}
    local pfile = io.popen('ls "' .. directory .. '"')
    for filename in pfile:lines() do
        i = i + 1
        t[i] = filename
    end
    pfile:close()
    return t
end

dir = "/tmp/mountd/disk1_part1/Paste/"
local function write_struct_data(body_string, ip)
    local body = cjson.decode(body_string)
    local data = {}
    data["encryptedPaste"] = body
    data["ip"] = ip
    data["expire"] = os.time() + math.max(0, tonumber(body["expireTime"]))
    data["time"] = os.time()
    local fp =  dir .. ip .. ".json"
    write_file(cjson.encode(data), fp)
end

local function load_files()
    local index, result = 0, {}
    for k, fp in pairs(scan_dir(dir)) do
        local content = read_file(dir .. fp)
        local json = cjson.decode(content)
        if os.time() <= json["expire"] then
            index = index + 1
            result[index] = json
        end
    end
    return result
end

rsp = {}
rsp["ip"] = ngx.var.remote_addr

if ngx.var.request_method == "POST" then
    ngx.req.read_body()
    body_string = ngx.req.get_body_data()
    if string.len(body_string) > 10 * 1024 * 1024 then
        rsp["success"] = false
        rsp["message"] = string.format("max length 10MB, but received %dB", string.len(body_string))
    else
        write_struct_data(body_string, ngx.var.remote_addr)
        rsp["success"] = true
    end
elseif ngx.var.request_method == "GET" then
    rsp["pasteInfos"] = load_files()
    rsp["success"] = true
elseif ngx.var.request_method == "DELETE" then
    ngx.req.read_body()
    body = cjson.decode(ngx.req.get_body_data())
    ip = string.match(tostring(body["ip"]), '[0-9.]+')
    if string.len(ip) == 0 then
        rsp["success"] = false
        rsp["message"] = "invalid file"
    else
        os.remove(dir .. ip .. ".json")
        rsp["success"] = true
    end
else
    rsp["success"] = false
    rsp["message"] = string.format("unexpected method: %s", ngx.var.request_method)
end

ngx.header["content-type"] = "application/json"
ngx.say(cjson.encode(rsp))
