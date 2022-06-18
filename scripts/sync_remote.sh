ssh server "rm /www/static/css/main*"
ssh server "rm /www/static/js/main*"
yarn build
rsync -avz build/* server:/var/www/html/
ssh server "/etc/init.d/nginx restart"