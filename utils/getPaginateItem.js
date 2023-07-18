async function getPagination(pagenNumber, pageSize, Model, filterOptions) {
    try {
        const options = {
            page: pagenNumber,
            limit: pageSize,

        }
        if (filterOptions && typeof filterOptions == "object") {
            options.query = filterOptions
        }
        const paginatedItems = await Model.paginate({},options);
        // console.log(paginatedItems);
        return {
            currentPage: paginatedItems.page,
            totalPages: paginatedItems.totalPages,
            totalItems: paginatedItems.totalDocs,
            items: paginatedItems.docs,
        };
    }
    catch (error) {
        console.log(error);
    }
}

module.exports=getPagination