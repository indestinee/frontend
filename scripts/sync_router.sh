rsync -avz others/config/gl.conf root@openwrt:/etc/nginx/conf.d/
rsync -avz others/config/transmission root@openwrt:/etc/config/
rsync -avz others/lua/*.lua root@openwrt:/usr/share/gl-ngx/
ssh openwrt "/etc/init.d/nginx restart"

yarn build
ssh openwrt "rm /www/static/css/main*"
ssh openwrt "rm /www/static/js/main*"
rsync -avz build/ root@openwrt:/www/

