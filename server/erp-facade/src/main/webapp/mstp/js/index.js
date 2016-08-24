/**
 * Created by xww on 2016/8/31.
 */
function getInfoDisclosure(){
    $.ajax({
        url:FACADE_URL+'/information/filter',
        data:{
            code:'0001'
        },
        type:'POST',
        success:function(response){
            var data = response.data.pageData;
            localStorage.setItem("infoDisclosure",JSON.stringify(data));
            window.location.href = 'about.html';

        },
        error:function(err){
            console.log("2")
        }
    })
}
