$(function(){	
	renderLists();
});

function renderLists(){
	$.get('/users')
	.then(([users, offices]) => {
		return Promise.all([
			createUserHtml(users, offices),
			createOfficeHtml(users, offices)
		]) 
	})
	.then(([userLis, officeLis])=> {
		createUserList(userLis);
	});	
}