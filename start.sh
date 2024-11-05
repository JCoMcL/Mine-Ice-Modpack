#!/usr/bin/env sh

cd "$(dirname "$0")"

JAVA=/opt/openjdk-bin-17/bin/java
MEM=8G
SERVER=fabric-server-mc.1.20.1-loader.0.16.7-launcher.1.0.1.jar

start() {
	$JAVA -Xms$MEM -Xmx$MEM --add-modules=jdk.incubator.vector -XX:+UseG1GC -XX:+ParallelRefProcEnabled -XX:MaxGCPauseMillis=200 -XX:+UnlockExperimentalVMOptions -XX:+DisableExplicitGC -XX:+AlwaysPreTouch -XX:G1HeapWastePercent=5 -XX:G1MixedGCCountTarget=4 -XX:InitiatingHeapOccupancyPercent=15 -XX:G1MixedGCLiveThresholdPercent=90 -XX:G1RSetUpdatingPauseTimePercent=5 -XX:SurvivorRatio=32 -XX:+PerfDisableSharedMem -XX:MaxTenuringThreshold=1 -Dusing.aikars.flags=https://mcflags.emc.gs -Daikars.new.flags=true -XX:G1NewSizePercent=30 -XX:G1MaxNewSizePercent=40 -XX:G1HeapRegionSize=8M -XX:G1ReservePercent=20 -jar $SERVER --nogui
}

restart_message() {
	echo
	echo "Server is Restarting"
	echo press any key to cancel
	for i in `seq 5 -1 1`
		do echo -n "$i..." && read -t1 -n1 && exit 
	done
	echo
}

if [ -z "$1" ]
	then start
else case "$1" in
	--restart|-r)
		shift
		while true; do
			$0 $@;
			restart_message;
		done;;
	--dtach|-d)
		shift
		exec dtach -A dtach.sock $0 $@;;
	*)
		echo "Unknown argument: $a"
		exit 1
		;;
esac fi
