data: 
	curl -o temp.csv "https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv";
	csvgrep -c "state" -r  "Massachusetts" temp.csv | csvgrep -c "county" -r "Unknown" -i | csvcut -c "date,county,cases,deaths" > covid-ma--nyt.csv;
	rm temp.csv