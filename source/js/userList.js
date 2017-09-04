
function createUserHtml(users, offices){
	users.forEach((user) => {
		let option;
		let optionNone = (!user.office) ? `<option selected='selected' > -- none -- </option>` : '<option> -- none -- </option>';

 //Add the officeList for to each user			 
	user.offices = offices.reduce((memo, office) => {
		option = `<option value=${office.id}>`

		// User's office should be "selected"
		 if (user.office) {
		 		if (user.office.name === office.name)
				option  = `<option selected='selected' value=${office.id}>`; 
		 } 
		return memo += `
			${option}
				${office.name}
			</option>`
	}, optionNone); 
});

	// Create single User HTML
	let lis =  users.reduce((memo, user) => {
		return memo += `
			<li class='list-group-item'>${user.name}
				<select class='select-group'>
					${user.offices}
				</select>
				<div class='removeUser'>
					<button class='btn btn-danger btn-sm' id=${user.id} style='margin-top: 10px'>Remove</button>
				</div>

			</li>
		`
	}, '');

	//Create user list
	const $userList = $('.userList');
	$userList.html(
	`<ul class='list-group'> 
			${lis}
		</ul>`);
	removeUser();	
}

function removeUser(){
 	var $removeUser = $('.removeUser');
	$removeUser.on('click', 'button', function(){
		let userId = $(this).attr('id');
		$.ajax({
			url: `/users/${userId}`,
			type: 'DELETE',
			success: renderLists
		})
	});		
}
