function createOfficeHtml(users, offices){
	//Create each Office
	const lis = offices.reduce((memo, office) => {
		return memo += 
		`<li class='list-group-item'>
			<h4> ${office.name} </h4>
			<h5> <i> Lat: </i>  ${office.lat} </h5>
			<h5> <i> Lng: </i>  ${office.lng} </h5>
			<hr5 style='color: blue'> <i> Users: ${office.users.length} <i></h5>
			<div class='removeOffice'>
			<button class='btn btn-danger btn-xs' id='${office.id}'>delete</button>
		</li>`
	}, '');

	// Create office list
	const $officeList = $('.officeList');
	$officeList.html(
	`<ul class='list-group'> 
			${lis}
		</ul>`);
	removeOffice();	
	addOffice();
}

function removeOffice(){
	const removeOffice = $('.removeOffice');
	removeOffice.on('click', 'button', function(){
		let officeId = $(this).attr('id');
		$.ajax({
			url: `/offices/${officeId}`,
			type: 'DELETE', 
			success: renderLists
		})
	})
}

function addOffice(){
 	var addOffice = $('#addOffice');
	addOffice.submit( function(event){
		var name = addOffice.find('[name="name"]').val()
		$.ajax({
			url: '/offices',
			type: 'POST',
			data: {"name": name},
			success: renderLists 
		});
	});		
}