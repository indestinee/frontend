local open = io.open
local cjson = require "cjson"

local function read_file(path)
    local file = open(path, "rb") -- r read mode and b binary mode
    local content = file:read "*a" -- *a or *all reads the whole file
    return content
end

data = {}
for i = 0, 6, 1 do
    local fp = string.format("/sys/class/thermal/thermal_zone%d/temp", i)
    local content = read_file(fp)
    data[i+1] = tonumber(content)
end

result = table.concat(data, "\n")
ngx.header["content-type"] = "application/json"

rsp = {}
rsp["temperatures"] = data
ngx.say(cjson.encode(rsp))
