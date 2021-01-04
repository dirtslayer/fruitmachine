select * from ( SELECT row_number() OVER (
	ORDER BY score DESC
	) rank,
	*
	FROM
	players ) t where name = 'Milan' and server = 'War Fish'
	