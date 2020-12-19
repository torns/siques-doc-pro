#FROM fabric8/java-alpine-openjdk8-jdk:1.8.0
FROM registry.cn-hangzhou.aliyuncs.com/siques-public/oracle-jre8:1.8.0_241-b07

# 将jar包添加到容器中并更名为app.jar
ADD ./target/backend-0.0.1-SNAPSHOT.jar backend-0.0.1-SNAPSHOT.jar
EXPOSE 3002
# 运行jar包
#RUN sh -c 'touch /core-business.jar'
ENTRYPOINT ["java","-jar","/backend-0.0.1-SNAPSHOT.jar","--spring.profiles.active=prod"]