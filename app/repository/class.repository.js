const Class = require('../models/class')
const { v4: uuid } = require("uuid");

class ClassRepository {

    static async createClass(data)
    {   
        const {id, title, description, teacher_id} = data;
        await Class.query().insert({id, title, description, teacher_id});
    }   

    static async getClasses(user)
    {
        const data = await Class.query()
            .join('users', 'users.id', '=', 'classes.teacher_id')
            .where({'teacher_id' : user.id})
        
        return data;
    }

    static async getClassByID(user, id = "")
    {
        const data = await Class.query()
            .join('users', 'users.id', '=', 'classes.teacher_id')
            .where({'classes.id' : id, 'teacher_id' : user.id})
            .first();

        return data;
    }

    static async updateClassData(user, id, data)
    {
        const {title, description} = data;

        await Class.query()
            .where({ id })
            .whereIn('teacher_id', function() {
            this.select('id')
                .from('users')
                .where('id', user.id);
            })
            .update({
                title, 
                description
            });
    }

    static async deleteClass(user, id)
    {
        await Class.query()
            .where({ id })
            .whereIn('teacher_id', function() {
            this.select('id')
                .from('users')
                .where('id', user.id);
            })
            .delete();
    }

}

module.exports = ClassRepository