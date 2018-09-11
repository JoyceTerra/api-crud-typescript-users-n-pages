import { JsonController, Get, Param, Put, Body, NotFoundError, HttpCode, Post } from 'routing-controllers'
import Page from './entity'
// Body, Post, HttpCode

// this makes sure a class is marked as controller that always returns JSON
// perfect for our REST API
@JsonController()
export default class PageController {

// this marks a method as endpoint
// in this case it responds to any GET /pages/:id
// request with :id being a variable parameter
    // @Get('/pages/:id')
    // getPage(
    // // this decorator retrieves the ID parameter from the url    
    //     @Param('id') id: number
    // ): Page {
    //     return pagesById[id]
    // }
    // @Get('/pages')
    // getAllPages(): Pages {
    //     return  {
    //         pages: Object.values(pagesById) //take the values og my object(pages in the db)
    //     }
    // }

    @Get('/pages/:id')
    getPage(
    @Param('id') id: number
    ) {
    return Page.findOne(id)
    }
    //this:
//     @Get('/pages')
// allPages() {
//   const pages = Page.find()
//   return { pages }
// }
//becames this:
    @Get('/pages')
    async allPages(){
        const pages = await Page.find()
        return { pages}
    }
    //Find the Page using the given id (from @Param)
    //If the Page does not exist, throw an error
    //If the Page exists, overwrite the properties that are updated
    // Save the updated Page
    @Put('/pages/:id')
    async updatePage(
    @Param('id') id: number,
    @Body() update: Partial<Page>
    ) {
        const page = await Page.findOne(id)
        if (!page) throw new NotFoundError('Cannot find page')

        return Page.merge(page, update).save()
    }
    @Post('/pages')
    @HttpCode(201)
    createPage(
    @Body() page: Page
    ) {
        return page.save()
    }

//     @Put('/pages/:id')
//     updatePage(
//         @Param('id') id: number,
//         @Body() body: Partial<Page>
//     ): Page {
//         console.log(`Incoming PUT body param:`, body)
//         return pagesById[id]
//     }
//     @Post('/pages')
//         @HttpCode(201)
//         createPage(
//         @Body() body: Page
//         ): Page {
//             console.log(`Incoming POST body param:`, body)
//             return body
// }
}
