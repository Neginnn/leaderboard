#!/bin/sh

operation="$1"
shift
export PATH="${PATH}:/app/node_modules/.bin/"

cd /app

if [[ -s /app/.build-environment.sh ]] ; then
	echo Pulling environment.sh from root run
	. /app/.build-environment.sh
	env | grep 'NODE
HOME
PATH'
fi

if [[ "$(whoami)" == "root" ]] ; then
	echo Running as root: changing to node user
	set -x
	chown -R node:node: /app/.next && chmod -R 755 /app/.next
	[[ -n "$DEBUG" ]] && env
	env | grep -v HOME= | grep -v PATH= | sed 's/^/export /g' > /app/.build-environment.sh
	chmod 755 /app/.build-environment.sh
	exec su - node /app/docker-entrypoint.sh ${operation} "$@"
fi

#ls -la /app/node_modules/.bin
if [[ ! -n "$operation" ]] || [[ "$operation" == "build" ]] ; then
	export NODE_OPTIONS="--max-old-space-size=1024"
	echo "Building project in ${PWD}"
	umask 022
	echo Running "$operation $@" as $(whoami)
fi

if [[ -n "$operation" ]] ; then
	set -x
	exec yarn $operation "$@"
else
	set -x
	yarn build && exec yarn start
fi
