let id = localStorage.getItem("idDetail");

id = Number(id); 

console.log("Project ID from localStorage:", id);

function getProjectById(id) {
  return fetch("../../script/projects.json")
	.then((response) => {
	  if (!response.ok) {
		throw new Error("Failed to fetch the projects");
	  }
	  return response.json();
	})
	.then((data) => {
	  const project = data.find((project) => project.id === id);
	  
	  if (project) {
	    console.log("Project data:", project);

		console.log(project.gitHubLink)

		if (project.gitHubLink != undefined) {
			$(".section__project-buttons--github").show();
			$('.section__project-buttons--github').attr('href', project.gitHubLink);
		}

		if (project.figmaLink != undefined) {
			$(".section__project-buttons--figma").show();
			$('.section__project-buttons--figma').attr('href', project.figmaLink);
		}

		$(".section__project-tegs").append(`
			${project.tegList.map((teg) => `<button class="section__project-tegs--button project-show" style="display: none;">${teg}</button>`).join("")}
		`);

		$(".section__titel").text(project.title);
		$(".section__project-card--title").text(project.subTitle);
		$(".section__project-card--description").text(project.description);


		setTimeout(() => {
			$(".project-loading").hide();
			$(".project-show").show();
		}, 1000)

	  } else {
	    console.log("Project not found");
	  }
	  
	  return project; 
	})
	.catch((error) => {
	  console.error("Error fetching the project:", error);
	});
}


getProjectById(id);
