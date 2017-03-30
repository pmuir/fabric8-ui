export class Codebase {
    attributes: CodebaseAttributes;
    id?: string;
    links?: CodebaseLinks;
    relationships?: CodebaseRelations;
    type: string;
}

export class CodebaseAttributes {
    createdAt?: string;
    type?: string;
    url?: string;
}

export class CodebaseLinks {
    edit?: string;
    meta?: any;
    related?: string;
    self?: string;
}

export class CodebaseRelations {
    space?: RelationGeneric;
}

export class RelationGeneric {
    data?: GenericData;
    links?: GenericLinks;
    meta?: any
}

export class GenericData {
    id?: string;
    links?: GenericLinks;
    type?: string;
}

export class GenericLinks {
    meta?: any;
    related?: string;
    self?: string;
}
