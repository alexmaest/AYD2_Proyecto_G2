const creatorRepository = require('../repositories/creatorRepository');

class creatorModel {
    constructor(){
        this.repository = new creatorRepository();
    }

    async updateBanner(bannerUrl, userId){
        try{
            const banner = await this.repository.update(bannerUrl, userId)
            return banner
        } catch(err){
            console.log(err)
            throw new Error('Error while updating banner');
        }
    }

    async getBanner(userId){
        try{
            const banner = await this.repository.findById(userId)
            return banner
        } catch(err){
            console.log(err)
            throw new Error('Error while updating banner');
        }
    }    
}

module.exports = new creatorModel();