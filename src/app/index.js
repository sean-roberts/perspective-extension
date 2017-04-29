const page = require('./page');
const perspective = require('./perspective');
const perspectiveIndicator = require('./perspective-indicator');


page.init();

page.textProcessor((text)=>{

    if(!text){
        perspectiveIndicator.showForLevel(0);
        return;
    }

    perspectiveIndicator.showLoading();

    perspective.fetchToxicity(text).then((toxicity)=>{
        const toxicitySummaryScore = toxicity.summaryScore.value;

        // if(toxicitySummaryScore > 0.7){
        //     console.log('this is likely very toxic', toxicitySummaryScore);
        // }else if(toxicitySummaryScore > 0.4){
        //     console.log('this could be toxic but not in all cases', toxicitySummaryScore);
        // }else {
        //     console.log('this is not toxic', toxicitySummaryScore);
        // }

        perspectiveIndicator.showForLevel(toxicitySummaryScore);
    }).catch(()=>{
        perspectiveIndicator.showError();
    });
});

page.onBlur(()=>{
    perspectiveIndicator.hide();
});
