# WeathercastApp

This project was developed using Angular version 17.

The project is structured into 3 NgModules:
	- AppModule (root)
	- RoutingModule	- takes care of path managment
	- MaterialsModule - imports Angular Material Modules to keep root module cleaner

Table is fetching data from https://open-meteo.com/en/docs. The data consists of weathercast info of the current day and 6 next days. There is an option to add data of past days.
Linear graph uses data displayed on the current page of the table.

Bussiness logic of fetching and managing weathercast data is managed by WeathercastDataService class.

Calculator is set up according to the assignment. One small addition is the restricted range when setting humidity (0 - 100).




