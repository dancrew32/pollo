checkin: tidy
	git add -A && git commit && git push origin master

tidy:
	./node_modules/.bin/prettier --write .

frontend:
	./node_modules/.bin/react-scripts start
