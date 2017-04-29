module.exports = {
    fetchToxicity: (text)=>{
        return fetch('https://perspective.now.sh/?text=' + encodeURI(text))
            .then((r)=>r.json())
            .then((resp)=>{

                if(resp.error){
                    throw Error(resp.error);
                }

                return resp.attributeScores.TOXICITY;
            });
    }
};
