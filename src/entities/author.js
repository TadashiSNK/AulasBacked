import { EntitySchema } from "typeorm";

const author = new EntitySchema({
    name: "Author",
    tablename: "Author",
    columns: {
        id: {primary:true, type: "int", generated: "increment"},
        name: {type: "varchar", length: 50, nullable:false},
        birthdate: {type:"datetime", nullable:false},
        nationality: {type:"datetime", nullable:false},
        createdAt: {type:"datetime", nullable:false, default: () => {"NOW"}},
        deletedAt: {type:"datetime", nullable:true},
    },
})

export default author