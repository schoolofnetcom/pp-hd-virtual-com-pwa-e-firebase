import templateComponent from './template';
import fileListComponent from './files_list';
import uploaderComponent from './uploader';

const components = [
    templateComponent,
    fileListComponent,
    uploaderComponent
];

class Init {
    constructor() {
        components.forEach((component) => {
            let element = document.querySelector(component.el);
            element.innerHTML = component.template;
            component.afterBind();
        })
    }
}

new Init();
