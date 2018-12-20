var process = new ReactiveVar("");

Template.HomeLayout.helpers({
    isProcessing:function(){
        if ( process.get() == true){
            return true;
        } else {
            return false;
        }
    }
});