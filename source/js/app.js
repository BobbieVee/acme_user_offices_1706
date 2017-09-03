$(function(){
	const $userList = $('.userList');
	$.get('/users')
	.then(([users, offices]) => {
		users.forEach((user) => {
			let option;
			let optionNone = (!user.office) ? `<option selected='selected' > -- none -- </option>` : '<option> -- none -- </option>';

		 //Add the officeList for User.offices			 
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

		// Create User
		return users.reduce((memo, user) => {
			return memo += `
				<li class='list-group-item'>${user.name}
					<select class='select-group'>
						${user.offices}
					</select>
				</li>
			`
		}, '');
	})
	.then(lis => {
		$userList.html(
			`<ul class='list-group'> 
					${lis}
				</ul>`);
	});
})