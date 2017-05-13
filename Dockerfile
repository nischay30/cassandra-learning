FROM cassandra
COPY cassandra.yaml /etc/cassandra
CMD ["cassandra", "-f"]