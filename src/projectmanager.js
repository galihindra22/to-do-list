import Project from "./project.js";

class ProjectManager{
    constructor(){
        this.projects = [];
        
        const defaultProject = new Project("Default");

        this.projects.push(defaultProject);
        this.activeProjectId = defaultProject.id;
    }
    addProject(name){
        const project = new Project(name);
        this.projects.push(project);
        return project;
    }

    getActiveProject(){
        return this.projects.find((project) => project.id === this.activeProjectId);
    }

    switchActiveProject(projectId){
        const project = this.projects.find((project) => project.id === projectId);
        if(project){
            this.activeProjectId = projectId;
        }
    }

    deleteProject(projectId){
        if(this.projects.length <= 1) return;

        this.projects = this.projects.filter((project) => project.id !== projectId);
        
        if(this.activeProjectId === projectId){
            this.activeProjectId = this.projects[0].id;
        }
    }
}

export default ProjectManager;