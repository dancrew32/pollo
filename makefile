checkin: tidy
	git add -A && git commit && git push origin master

tidy:
	./node_modules/.bin/prettier --write .
