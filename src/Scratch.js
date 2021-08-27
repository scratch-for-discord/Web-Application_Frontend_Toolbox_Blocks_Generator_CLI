const { createError, createWarning } = require("./Util");

module.exports = class Scratch {
    constructor() {
        this.config = {
            name: null,
            description: null,
            version: null,
            icon: null,
            author: {
                name: null,
                url: null
            },
            tags: []
        };
    }

    setName(name) {
        if (!name) return createError("Project name was not specified!");
        this.config.name = name;
    }

    setDescription(description) {
        if (!description) return createError("Project description was not specified!");
        this.config.description = description;
    }

    setVersion(version) {
        if (!version) return createError("Project version was not specified!");
        this.config.version = version;
    }

    setIcon(icon) {
        if (!icon) createWarning("Icon was not specified!");
        this.config.icon = icon || null;
    }

    setAuthor(name, url) {
        if (!name) return createError("Project author name was not specified!");
        if (!url) createWarning("Author url was not specified!");
        this.config.author = {
            name: name,
            url: url || null
        };
    }

    setTags(tags = []) {
        if (!Array.isArray(tags) || !tags.every(a => typeof a === "string")) return createError("Tags must be Array of string!");
        if (!tags.length) createWarning("Tags were not specified!");
        this.config.tags = tags;
    }

    toJSON() {
        return this.config;
    }

    toString() {
        return JSON.stringify(this.toJSON(), null, "  ");
    }
}