yarn build
rsync -avz build/* server:/var/www/html/
ssh server "/etc/init.d/nginx restart"
