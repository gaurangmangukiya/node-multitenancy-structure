const models = require('../models');

exports.find = async ({
                          db,
                          collection,
                          query,
                          options,
                          project,
                          limit,
                          skip,
                          sort,
                          populate,
                          hint
                      }) => {

    let result = await db
        .models[collection]
        .find(query, project, options)
        .populate(populate)
        .limit(limit)
        .skip(skip)
        .sort(sort)
        .hint(hint ? hint : {})
        .lean()
        .exec();
    return result ? result : null;
}

exports.findOne = async ({db, collection, query, project, sort, populate, hint}) => {
    let result = await db
        .models[collection]
        .findOne(query, project)
        .sort(sort)
        .hint(hint ? hint : {})
        .populate(populate)
        .lean()
        .exec();
    return result ? result : null;
}

exports.insertOne = async ({db, collection, document, options}) => {
    console.log(document);
    let result = await db.model(collection, models[collection]).create(document, options);
    return result && result.toObject ? result.toObject() : result;
}

exports.insertMany = async ({db, collection, documents, options}) => {
    let result = await db.model(collection, models[collection]).insertMany(documents, options);
    result = result.map(e => {
        return e && e.toObject ? e.toObject() : e;
    })
    return result ? result : null;
}

exports.updateOne = async ({db, collection, query, update, options}) => {
    let result = await db.model(collection, models[collection])
        .updateOne(query, update, options)
        .lean();
    return result ? result : null;
}

exports.
updateMany = async ({db, collection, query, update, options}) => {
    let result = await db.model(collection, models[collection])
        .updateMany(query, update, options)
        .lean();
    return result ? result : null;
}

exports.deleteOne = async ({db, collection, query, options}) => {
    let result = await db.model(collection, models[collection]).deleteOne(query, options);
    return result ? result : null;
}

exports.deleteMany = async ({db, collection, query, options}) => {
    let result = await db.model(collection, models[collection]).deleteMany(query, options);
    return result ? result : null;
}

exports.distinct = async ({db, collection, field, query}) => {
    let result = await db.model(collection, models[collection]).distinct(field, query);
    return result ? result : null;
}

exports.aggregate = async ({db, collection, pipeline, options}) => {
    let result = await db.model(collection, models[collection]).aggregate(pipeline, options).exec();
    return result ? result : null;
}

exports.countDocuments = async ({db, collection, query}) => {
    let result = await db.model(collection, models[collection]).countDocuments(query).lean();
    return result ? result : 0;
}

exports.findByIdAndUpdate = async ({db, collection, query, update, options}) => {
    let result = await db.model(collection, models[collection])
        .findByIdAndUpdate({_id: ObjectId(query)}, update, options)
        .lean();
    return result ? result : null;
}

exports.save = async ({document}) => {
    let result = await document.save({lean: true});
    return result && result.toObject ? result.toObject() : result;
}

exports.findByIdAndDelete = async ({db, collection, id, options}) => {
    let result = await db.model(collection, models[collection])
        .deleteOne({_id: ObjectId(id)}, options);
    return result ? result : null;
}

exports.findOneAndUpdate = async ({db, collection, query, update, options}) => {
    let result = await db.model(collection, models[collection])
        .findOneAndUpdate(query, update, options)
        .lean();
    return result && result.toObject ? result.toObject : result;
}

exports.findOneAndDelete = async ({db, collection, query, options}) => {
    let result = await db.model(collection, models[collection])
        .findOneAndDelete(query, options);
    return result ? result : null;
}

exports.createDocument = ({db, collection, object}) => {
    return db.model(collection, models[collection])(object);
}

exports.dropCollection = async ({db, collection}) => {
    return db.model(collection, models[collection]).collection.drop();
}