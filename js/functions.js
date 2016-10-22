$(document).ready( function () {
	initPickers();

	
	/*
	 * Multi-Check
	 * */
	$('.listtimes__check--day').on('click', function() {
		var id = $(this).attr('id');
		var checked = this.checked;
		if (checked) {
			$('.listtimes__check--' + id).attr('checked', true);
		} else {
			$('.listtimes__check--' + id).attr('checked', false);
		}
	});

	/* 
	 * Actions
	 * */

	$('form[name="actions"]').submit(function(e) {
		e.preventDefault();
		var action = $('select.listtimes__select').val();
		console.log(action);

		switch (action) {
			case 'bulkdelete': 
				var elements = $('input.listtimes__check--time:checked');
				var ids = [];
				for (var i = 0; i < elements.length; i++) {
					id = $(elements[i]).attr('id');
					ids.push(id.split('--')[1]);
				}
				var obj = {1:'a', 2:'b'};
				$.ajax({
					type: 'POST',
					cache: false,
					url: 'bulkdelete',
					data: {ids: ids},
					success: function(msg) {
						console.log('success');
					},
					error: function(msg) {
						console.log('error');
					}
				});
				break;
			default: 
				// do nothing
		}
		location.reload();
	});

	/*
	 * edit modal
	 * */
	$('.listtimes__text--editlink').on('click', function(e) {
		e.preventDefault();
		$('#editme').modal();
		var link = e.currentTarget.href;
		$.get(link, function(data, status) {
			$('#editme .modal-content').html(data);
			initPickers();
		});
	});

	/*
	 $.get("info", function(data, status){
		console.log("Data: " + data + "\nStatus: " + status);
	 });
	 */

	/*
	 $('form[name="addTime"]').submit(function(e) {
		 e.preventDefault();
		 console.log(e);
		 $.ajax({
			 type: 'POST',
			 cache: false,
			 url: 'addTime',
			 data: $(this).serialize(),
			 success: function(msg) {
				 console.log('success');
				 console.log(JSON.stringify(msg));
			 },
			 error: function(msg) {
				 console.log('error');
				 console.log(JSON.stringify(msg));
			 }
		 });
	 });
	 */
});


function initPickers() {
	/* Datepicker */
	$('.datepicker').datepicker({
		format: 'dd.mm.yy', 
		autoclose: true,
		language: 'de',
		todayBtn: true,
		todayHighlight: true,
		weekStart: 1,
		assumeNearbyYear: true
	});

	/* Timepicker */
	$('.timepicker').timepicker({
		step: 15,
		timeFormat: 'H:i',
	});

	if ($('.timepicker').val() == '') {
		console.log('set timepicker date');
		$('.timepicker').timepicker('setTime', getQuarterDate());
	}

	/* selectpicker */
	$('.selectpicker').selectpicker({
		liveSearch: true,
		liveSearchStyle: 'contains',
		mobile: true,
		selectOnTab: true,
		noneSelectedText: 'Auswähln',
	});

}

function getQuarterDate(x) {
	/* for addTimes timepicker 
	 * returns date rounded to next quarter hour 
	 * */ 
	console.log(x);
	var d = new Date();
	var minMod = d.getMinutes() % 15;
	if (minMod > 7) {
		d.setMinutes(d.getMinutes() + (15 - minMod));
	} else {
		d.setMinutes(d.getMinutes() - minMod);
	}
	return d;
}
