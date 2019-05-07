import {
    CREATE_PROJECT,
    GET_PROJECTS,
    GET_PROJECT,
    GET_USER_PROJECTS,
    DELETE_PROJECT,
    EDIT_PROJECT
} from "../actions/types";

const initialState = {
    projects: [],
    project: {},
    user_projects: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case CREATE_PROJECT:
            return action.payload;
        case GET_PROJECTS:
            return {
                ...state,
                projects: action.payload
            };
        case GET_PROJECT:
            return {
                ...state,
                project: action.payload
            };
        case GET_USER_PROJECTS:
            return {
                ...state,
                user_projects: action.payload
            };
        case DELETE_PROJECT:
            return {
                ...state,
                user_projects: state.user_projects.filter(
                    project => project._id !== action.payload
                )
            };
        case EDIT_PROJECT:
            return state.user_projects.map(project => {
                if (project._id === action.payload.id) {
                    return action.payload;
                } else {
                    return project;
                }
            });
        default:
            return state;
    }
}
