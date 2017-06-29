
(function($, moment) {
	var pluginName = "datepicker";
 
	// Instance moment locale
	moment.locale('es');
 
	// Constructor
	this.datepicker = function() {
		this.element = arguments[0].element;
		this.currentDate = moment();
		this.template = null;
		this.maxDate = null;
		this.minDate = null;
		console.log(arguments[0].element)
		this.initialize();
	}

	datepicker.prototype = {
		initialize: function() {
			this.initializeTemplate();
			this.show();
			this.initButtons();
		},
		initDate: function(da) {
			this.showDate(da);
		},
		showDate: function(data) {
			if (data) {
				document.getElementById('year').innerHTML = data.format('YYYY');
				document.getElementById('datepicker').style.display = 'block';
				document.getElementById('month').innerHTML = data.format('MMM');

				var days = this.generateCalendar(data);
				var _template = this.constructHTMLCalendar(data, days);
				console.log(moment.months());
				console.log(days);
				console.log(_template);
				document.body.innerHTML += _template;
			}
		},
		initializeTemplate: function() {
			this.template = `
				<div class="datepicker" id="datepicker" style="display: none;">
					<div class="year" id="year"></div>
					<div class="next" id="nextYear">N</div>
					<div class="next" id="previousYear">P</div>
					<div class="year" id="month"></div>
					<pre id="days"></pre>
				</div>
			`
		},
		initButtons: function() {
				console.log(this)
			document.getElementById('nextYear').addEventListener("click", (e) => {
				console.log(e)
				this.currentDate.add(1, 'years');
				this.initDate(this.currentDate)
			});
			document.getElementById('previousYear').addEventListener("click", (e) => {
				console.log(e)
				this.currentDate.subtract(1, 'years');
				this.initDate(this.currentDate)
			});
			document.getElementById(this.element).addEventListener("click", (e) => {
				console.log(e)
				this.initDate(this.currentDate)
			});
		},
		show: function() {
			console.log('this.template')
			document.body.innerHTML += this.template;
		},
		generateCalendar: function (date) {
			this.days = [];
                 for (var i = 0; this.days.length < 7; i++)
                 {
                    if (i > 6)
                    {
                       i = 0;
                    }
                    this.days.push(i.toString());
                 }

	         var _calendar = {};

	         if (date !== null)
	         {
	            var startOfMonth = moment(date).startOf('month');
	            var endOfMonth = moment(date).endOf('month');

	            var iNumDay = startOfMonth.format('d');

	            _calendar.week = this.days;
	            _calendar.days = [];

	            for (var i = startOfMonth.date(); i <= endOfMonth.date(); i++)
	            {
	               if (i === startOfMonth.date())
	               {
	                  var iWeek = _calendar.week.indexOf(iNumDay.toString());
	                  if (iWeek > 0)
	                  {
	                     for (var x = 0; x < iWeek; x++)
	                     {
	                        _calendar.days.push(0);
	                     }
	                  }
	               }
	               _calendar.days.push(moment(startOfMonth).date(i));
	            }
	         }

	         return _calendar;
	    },
	    constructHTMLCalendar: function (date, calendar)
              {
                 var _template = "";

                 _template += '<div class="dtp-picker-month">' + date.format('MMMM YYYY') + '</div>';
                 _template += '<table class="table dtp-picker-days"><thead>';
                 for (var i = 0; i < calendar.week.length; i++)
                 {
                    _template += '<th>' + moment(parseInt(calendar.week[i]), "d").format("dd").substring(0, 1) + '</th>';
                 }

                 _template += '</thead>';
                 _template += '<tbody><tr>';

                 for (var i = 0; i < calendar.days.length; i++)
                 {
                    if (i % 7 == 0)
                       _template += '</tr><tr>';
                    _template += '<td data-date="' + moment(calendar.days[i]).format("D") + '">';
                    if (calendar.days[i] != 0)
                    {
                        
                            if (moment(calendar.days[i]).format("DD") === moment(this.currentDate).format("DD"))
                            {
                                _template += '<a href="javascript:void(0);" class="dtp-select-day selected">' + moment(calendar.days[i]).format("DD") + '</a>';
                            } else
                            {
                                _template += '<a href="javascript:void(0);" class="dtp-select-day">' + moment(calendar.days[i]).format("DD") + '</a>';
                            }
                        

                        _template += '</td>';
                    }
                 }
                 _template += '</tr></tbody></table>';

                 return _template;
              }
	}
 
})(jQuery, moment);
