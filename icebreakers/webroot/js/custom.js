$(document).ready(function(){  

 
    //what a maker

    $("nav.desktop[role='main'] ol li:not(:first)").mouseenter(function(){
         $( ".what_a_maker" ).animate({
            top: "57px",
            }, 500, function() {
            // Animation complete.
        });
    });

    $("nav.desktop[role='main'] ol li:not(:first)").mouseleave(function(){
         $( ".what_a_maker" ).animate({
            top: "-337px",
            }, 500, function() {
            // Animation complete.
        });
    });

    $(".close_popup").click(function(){

        if($(".popup.active").length<=1)
            $(".overlay").removeClass("active");
        $(this).parent().parent().parent().removeClass("active");
    });

    /*
        make responsive header
    */
    $("header.desktop[role='main']").css("width",ww+"px");

    /*
        mobile menu show hide
    */
    $(".hamburger").click(function(){
        if($("body").hasClass("pushed"))
            hide();
        else
        {
            $("body").addClass("pushed");
            $("#mm-drawer").addClass("viewing");
            $("#nav").addClass("showing");
            $(".mm-drawer-shelf").addClass("onscreen");
        }
    });

    $(".close").click(function(){
        hide();
        $( ".what_a_maker" ).animate({ right: "56px" }, 1000);
    });

    /*
        toggle desktop aside
    */
    $("#mm-drawer-nav .login").click(function(){
        if($("#login").hasClass("showing"))
        {
            hide();
             $( ".what_a_maker" ).animate({ right: "56px" }, 1000);
        }
        else
        {
            $("body").addClass("pushed");
            $("#mm-drawer").addClass("viewing");
            $("#login").addClass("showing");
            $("#register").removeClass("showing");
            $(".mm-drawer-shelf").addClass("onscreen");
            $( ".what_a_maker" ).animate({ right: "395px" }, 1000);
        }
    });

    /*
        for register page show
    */

    $("#mm-drawer-nav .register").click(function(){
        if($("#register").hasClass("showing"))
            hide();
        else
        {
            $("body").addClass("pushed");
            $("#mm-drawer").addClass("viewing");
            $("#register").addClass("showing");
            $("#login").removeClass("showing");
            $(".mm-drawer-shelf").addClass("onscreen");
        }
    });


    /*
        for forgot password show
    */
    

    $(".mm-drawer-form .forgot_password").click(function(){
        $("#login").addClass("left");
        $("#mm-drawer .mm-drawer-nav-internal a.back").addClass("available");
    });

    $(".login .register").click(function(){
        $("#mm-drawer-nav .register").trigger("click");
    });

    $("#nav .login").click(function(){
        $("#mm-drawer-nav .login").trigger("click");
    });

    $("#nav .register").click(function(){
        $("#mm-drawer-nav .register").trigger("click");
    });

    $("#nav .tags").click(function(){
        $("#mm-drawer-nav .tags").trigger("click");
        hide();
    });

    $("#nav .timings").click(function(){
        $("#mm-drawer-nav .timings").trigger("click");
        hide();
    });

    $("#nav .media").click(function(){
        $("#mm-drawer-nav .media").trigger("click");
        hide();
    });

    $("#nav .share_box").click(function(){
        $("#mm-drawer-nav .share_box").trigger("click");
        hide();
    });

    $("#nav .stripe").click(function(){
       
        $("#mm-drawer-nav .stripe").trigger("click");
        hide();
    });

    $("#mm-drawer .mm-drawer-nav-internal a.back").click(function(){
        $(this).removeClass("available");
        $("#login").removeClass("left");
    });

    /*
        for registration
    */

    $("#register .mm-drawer-form button").click(function(){
        var email = $.trim($("#register .mm-drawer-form input[name='email']").val());
        var password = $.trim($("#register .mm-drawer-form input[name='password']").val());
        if( (email=='') || (password=='') )
        {
            $("#register .mm-drawer-form .errors").addClass("display");
            return false;
        }

        $.post(siteurl+"admin/login",
        {
          email: email,
          password: password
        },
        function(data,status)
        {
           
            if(data=='1')
            {
                location.href = siteurl+"admin";
            }
            else
            {
                $("#register .mm-drawer-form .errors").addClass("display");
                return false; 
            }
        });
    });

    /*
        for genarte password
    */
    $("#forgot .forgot-form button").click(function(){
        var email = $.trim($("#forgot .forgot-form input[name='email']").val());
        if(email=='')
        {
            $("#forgot .forgot-form .errors").addClass("display");
            return false;
        }

        if(email_exist_forgot(email))
        { 
            if(send_link_to_user(email)){
                $("#forgot .forgot-form .errors").removeClass("display");
                $("#forgot .forgot-form .success").addClass("display");
                return true;
            }
        }
        else
        {
            $("#forgot .forgot-form .errors").addClass("display");
            $("#forgot .forgot-form .success").removeClass("display");
            return false;
        }
    });

    /*
        for send link to user
    */

    function send_link_to_user(email)
    {
        var a = $.ajax({
            type: 'POST',
            url: siteurl+"ajax/send_link_to_user",
            async:false,
            data: {email: email},
            success: function(data){
                
            }
        }).responseText;

        if(a=='0')
        {
            return false;
        }
        else
        {
            return true;  
        }
    }

    /*
        for check email_exist_forgot
    */

    function email_exist_forgot(email)
    {
        var a = $.ajax({
            type: 'POST',
            url: siteurl+"ajax/email_exist_forgot",
            async:false,
            data: {email: email},
            success: function(data){
                
            }
        }).responseText;

        if(a=='0')
        {
            return false;
        }
        else
        {
            return true;  
        }
    }

    /*
        for check email_exist
    */

    function email_exist(email)
    {
        var a = $.ajax({
            type: 'POST',
            url: siteurl+"admin/email_exist",
            async:false,
            data: {email: email},
            success: function(data){
                
            }
        }).responseText;

        if(a=='0')
        {
            return true;
        }
        else
        {
            $("#register .mm-drawer-form .errors").html("<div>Email id already exist!</div>");
            $("#register .mm-drawer-form .errors").addClass("display");
            return false;  
        }
    }

    /*
        for login
    */

    $("#login .root .mm-drawer-form button").click(function(){
        var email = $.trim($("#login .root .mm-drawer-form input[name='email']").val());
        var password = $.trim($("#login .root .mm-drawer-form input[name='password']").val());
        if( (email=='') || (password=='') )
        {
            $("#login .root .mm-drawer-form .errors").addClass("display");
            return false;
        }

        $.post(siteurl+"StripeCheckout/login",
        {
          email: email,
          password: password
        },
        function(data,status)
        {
            
            if(data=='1')
            {
                location.href = siteurl+"homes";
            }
            else
            {
                $("#login .root .mm-drawer-form .errors").html("<div>Invalid login!</div>");
                $("#login .root .mm-drawer-form .errors").addClass("display");
                return false; 
            }
        });  
    });

    function hide()
    {
        $("body").removeClass("pushed");
        $("#mm-drawer").removeClass("viewing");
        $("#register").removeClass("showing");
        $("#login").removeClass("showing");
        $(".mm-drawer-shelf").removeClass("onscreen");
        $("#mm-drawer .mm-drawer-nav-internal a.back").removeClass("available");
        $("#login").removeClass("left");
    }

    /*
        set style on window resize
    */

    //search the documents based on input

    var siteurl = $("#siteurl").attr("siteurl");
    var ww = $(window).width();
    
    $("#search input").keyup(function(){ 
		document.getElementById("iceque").value = "";		
		document.getElementById("miceque").value = "";
        if($(this).val()!=''){
            $(".searched-by").addClass("active");
            $(".searched-by li[data-filter='search']").html($(this).val());
            $.post(siteurl+"ajax/searchtags",
            {
              tags: $(this).val(),
            },
            function(data,status)
            {
                $(".exercise_wrap").html(data);
                $('.result-count .count').html($(".exercise_box").length);
                $(".nysection").hide();		
				$(".exercise_ny").hide();		
				$(".exercise").hide();		
				if($("#mm-tracks #work-bench article.bench").css('width') == "1140px"){		
					$("#mm-tracks #work-bench nav.filter").css('height','240px');		
				}
            });
        }
        else{
            $(".searched-by").removeClass("active");
            $.post(siteurl+"ajax/init_after_clear",
            function(data,status)
            {
                $(".exercise_wrap").html(data);
                $('.result-count .count').html($(".exercise_box").length);
            });
        }
    });
    
    $("#question input").keyup(function(){ 
		document.getElementById("icekey").value = "";		
		document.getElementById("micekey").value = "";
        if(!($(this).val().match(/\s/g)) && $(this).val() !=''){
            $(".searched-by").addClass("active");
            $(".searched-by li[data-filter='search']").html($(this).val());
            $.post(siteurl+"ajax/searchquestion",
            {
              question: $(this).val(),
            },
            function(data,status)
            {
                $(".exercise_ny").html(data);
                $(".exercise_ny1").html(data);
                $(".exercise_ny").show();
                $('.resultny-count .count').html($(".exercise").length);
                if($("#mm-tracks #work-bench article.bench").css('width') == "1140px"){
                    $("#mm-tracks #work-bench nav.filter").css('height','335px');
                }
                $(".nysection").show();
            });
        }
        else{
            $(".nysection").hide();
            $(".exercise_ny").hide();
            $(".exercise").hide();
            $(".searched-by").removeClass("active");
            if($("#mm-tracks #work-bench article.bench").css('width') == "1140px"){
                $("#mm-tracks #work-bench nav.filter").css('height','240px');
            }
            $.post(siteurl+"ajax/init_after_clear",
            function(data,status)
            {
                $(".exercise_wrap").html(data);
                $('.result-count .count').html($(".exercise_box").length);
            });
        }
    });
    
    $('.clear-ny').click(function(){		
	   $(".nysection").hide();		
	   $(".exercise_ny").hide();		
	   $(".pc").val(''); 		
	   $("#mm-tracks #work-bench nav.filter").css('height','260px');		
	});

    /*
        for filter search
    */
    
    $(".filter-wrap .bench #types li").click(function(){
        if($(this).hasClass("selected"))
            $(this).removeClass("selected");
        else
            $(this).addClass("selected");
        
        var types = get_filter_types();
        var timings = get_filter_timings();
        var types_name = get_filter_types_name();
        var timings_name = get_filter_timings_name();

        $(".filtered-by").addClass("active");
        $(".filtered-by li[data-filter='timing']").html(types_name+'  '+timings_name);

        if(types!='' || timings!=''){
            $.post(siteurl+"ajax/searchtags",
            {
                types: types,
                timings: timings,
                action: 'filter'
            },
            function(data,status)
            {
                $(".exercise_wrap").html(data);
                $('.result-count .count').html($(".exercise_box").length);
            });
        }
        else{
            $(".filtered-by").removeClass("active");
            $.post(siteurl+"ajax/init_after_clear",
            function(data,status)
            {
                $(".exercise_wrap").html(data);
                $('.result-count .count').html($(".exercise_box").length);
            });
        }
    });

    $(".filter-wrap .filter ul #length li").click(function(){
        if($(this).hasClass("highlight"))
            $(this).removeClass("highlight");
        else
            $(this).addClass("highlight");
        
        var types = get_filter_types();

        var timings = get_filter_timings();
        var types_name = get_filter_types_name();
        var timings_name = get_filter_timings_name();

        $(".filtered-by").addClass("active");
        $(".filtered-by li[data-filter='timing']").html(types_name+'  '+timings_name);

        if(types!='' || timings!=''){
            $.post(siteurl+"ajax/searchtags",
            {
                types: types,
                timings: timings,
                action: 'filter'
            },
            function(data,status)
            {
                $(".exercise_wrap").html(data);
                $('.result-count .count').html($(".exercise_box").length);
            });
        }
        else{
            $(".filtered-by").removeClass("active");
            $.post(siteurl+"ajax/init_after_clear",
            function(data,status)
            {
                $(".exercise_wrap").html(data);
                $('.result-count .count').html($(".exercise_box").length);
            });
        }
    });

    /*
        get filter types
    */

    function get_filter_types()
    {
        var type = '';
        $(".filter-wrap .bench #types li.selected").each(function() {
            type += $(this).attr("data-id")+",";
        });
        type = type.substring(0, type.length - 1);
        return type;
    }

    function get_filter_types_name()
    {
        var type = '';
        $(".filter-wrap .bench #types li.selected").each(function() {
            type += $(this).attr("data-val")+"  ";
        });
        return type;
    }

    /*
        get filter timings
    */

    function get_filter_timings()
    {
        var timing = '';
        $(".filter-wrap .filter ul #length li.highlight").each(function() {
            timing += $(this).attr("data-id")+",";
        });
        timing = timing.substring(0, timing.length - 1);
        return timing;
    }

    function get_filter_timings_name()
    {
        var timing = '';
        $(".filter-wrap .filter ul #length li.highlight").each(function() {
            timing += $(this).attr("data-val")+"  ";
        });
        return timing;
    }

    /*
        remove current name class
    */  

    function remove_class_current()
    {
        $("#work-bench section").removeClass("current");
        $("#work-bench .tabs li").removeClass("current");
    }

    /*
        for search again
    */
    
    $(".searched-by li[data-clear='search']").click(function(){

        $("#search input").val('');
        $(".searched-by").removeClass("active");
        $("#search input").trigger('keyup');

    });

    $(".filtered-by li[data-clear='filters']").click(function(){

        $(".filtered-by").removeClass("active");

        $(".filter-wrap .filter ul #length li").each(function() {
            $(this).removeClass("highlight");
        });

        $(".filter-wrap .bench #types li").each(function() {
            $(this).removeClass("selected");
        });

        $("#search input").trigger('keyup');
    });

    /*
        for more documents on scroll on the user side
    */

    $(".mm-view-more").click(function(){ 

        var siteurl = $("#siteurl").attr("siteurl");  

   
        var offset = $(".exercise_box").length;
       
        if(($.trim($("#search input.pc").val()) =='' && $.trim($(".custom_search-1 #search input.mob").val()) == '') && get_filter_types()=='' && get_filter_timings()==''){
            $.ajax({ 

                type: "POST",
                url: siteurl+'ajax/more_documents/',
                data:{'offset':offset},
                success: function(data){
                  
                    if(data){
                        $('.exercise_wrap').append(data);
                        $('.result-count .count').html($(".exercise_box").length);
                    }
                }
            });
       
        }                      

        /*
            get filetr types
        */

        function get_filter_types()
        {
            var type = '';
            $(".filter-wrap .bench #types li.selected").each(function() {
                type += $(this).attr("data-id")+",";
            });
            type = type.substring(0, type.length - 1);
            return type;
        }

        /*
            get filter timings
        */

        function get_filter_timings()
        {
            var timing = '';
            $(".filter-wrap .filter ul #length li.highlight").each(function() {
                timing += $(this).attr("data-id")+",";
            });
            timing = timing.substring(0, timing.length - 1);
            return timing;
        }
    });

    var ww = $(window).width();
    var model_width = $(".popup").css("width");
    model_width = parseInt(model_width, 10);
    var setmodel = (ww-model_width)/2;
    if(ww<768)
        $(".popup").css("left",(setmodel-20)+"px");
    else
        $(".popup").css("left",setmodel+"px");

    /*
        handle big image
    */
    var big_img_ht = parseInt($("#mm-track-landing img").css("height"), 10);
    var title_ht = parseInt($("#mm-track-landing h1").css("height"), 10);
    var top = 0;
    top = (big_img_ht-title_ht)/2;
    $("#mm-track-landing h1").css("top",top+"px");

    $("#mm-drawer-nav .types").click(function(){
        $(".model").addClass("active");
        $(".overlay").addClass("active");
    });

    $("#mm-drawer-nav .tags").click(function(){
        $(".model1").addClass("active");
        $(".overlay").addClass("active");
    });

    $("#mm-drawer-nav .timings").click(function(){
        $(".model2").addClass("active");
        $(".overlay").addClass("active");
    });

    $("#mm-drawer-nav .media").click(function(){
        $(".model3").addClass("active");
        $(".overlay").addClass("active");
    });

    $("#mm-drawer-nav .share_box").click(function(){
        $(".model6").addClass("active");
        $(".overlay").addClass("active");
    });

    $("#mm-drawer-nav .stripe").click(function(){
        $(".model8").addClass("active");
        $(".overlay").addClass("active");
    });

    $(".overlay").click(function(){
        $(this).removeClass("active");
        $(".popup").removeClass("active");
    });

    /*
        change status of types 
    */

    $(".model .changestatus").click(function(){
        var val = $(this).attr("data-value");
        var status = $(this).attr("data-status");
        var a = $.ajax({
            type: 'POST',
            url: siteurl+"ajax/changestatus_of_types",
            async:false,
            data: {id: val,status:status},
        }).responseText;

        if(a=='0')
        {
            $(this).html("Deactivate");
            $(this).attr("data-status",0);
        }
        else
        {
            $(this).html("Activate"); 
            $(this).attr("data-status",1); 
        }
    });

    /*
        change status of tags
    */
    
    $(".model1 .changestatus").click(function(){
        var val = $(this).attr("data-value");
        var status = $(this).attr("data-status");
        var a = $.ajax({
            type: 'POST',
            url: siteurl+"ajax/changestatus_of_tags",
            async:false,
            data: {id: val,status:status},
        }).responseText;

        if(a=='0')
        {
            $(this).html("Deactivate");
            $(this).attr("data-status",0);
        }
        else
        {
            $(this).html("Activate"); 
            $(this).attr("data-status",1); 
        }
    });

    /*
        change status of timing
    */
    
    $(".model2 .changestatus").click(function(){
        var val = $(this).attr("data-value");
        var status = $(this).attr("data-status");
        var a = $.ajax({
            type: 'POST',
            url: siteurl+"ajax/changestatus_of_timing",
            async:false,
            data: {id: val,status:status},
        }).responseText;

        if(a=='0')
        {
            $(this).html("Deactivate");
            $(this).attr("data-status",0);
        }
        else
        {
            $(this).html("Activate"); 
            $(this).attr("data-status",1); 
        }
    });

    /*
        update tag & type & timing
    */
    
    $(".edit_done").click(function(){
        var val = $(this).attr("data-value");
        var table = $(this).attr("data-table");
        var tag_id = $(this).attr("tag-id");
        var name = $.trim($("#"+tag_id).val());
        var function_name = "/ajax/edit_tag";
        if(table=='type'){
            function_name = "/ajax/edit_type";
            var tag_id = $(this).attr("type-id");
            var name = $.trim($("#"+tag_id).val());
        }
        else if(table=='timing'){
            function_name = "/ajax/edit_timing";
            var tag_id = $(this).attr("timing-id");
            var name = $.trim($("#"+tag_id).val());
        }
        if(name=='')
        {
            alert('This can not be blank!');
            return false;
        }
        var a = $.ajax({
            type: 'POST',
            url: siteurl+function_name,
            async:false,
            data: {id: val,name:name},
        }).responseText;

        if(a=='0'){ }
        else
        {
            var nn = 'Tag ';
            var msg = 'tag_update_msg';
            if(table=='type'){
                var nn = 'Type ';
                var msg = 'type_update_msg';
            }
            else if(table=='timing'){
                var nn = 'Timing ';
                var msg = 'timing_update_msg';
            }
            $("#"+msg).html(nn+'Updated ('+name+')');
            $("#"+msg).fadeIn(200);

            if(table=='type'){
                $("#edit_type"+val).show().html(name);
                $("#type"+val).hide();
                $("#ok_type"+val).hide();
            }
            else if(table=='tag'){
                $("#edit_tag"+val).show().html(name);
                $("#tag"+val).hide();
                $("#ok_tag"+val).hide();
            }
            else if(table=='timing'){
                $("#edit_timing"+val).show().html(name);
                $("#timing"+val).hide();
                $("#ok_timing"+val).hide();
            }
        }
    });

    $(".edit_by_id").click(function(){
        var id = $(this).attr("data-value");
        var table = $(this).attr("data-table");
        // alert(table);
        if(table=='type'){
            $("#edit_type"+id).hide();
            $("#type"+id).show();
            $("#ok_type"+id).show();
        }
        else if(table=='tag'){
            $("#edit_tag"+id).hide();
            $("#tag"+id).show();
            $("#ok_tag"+id).show();
        }
        else if(table=='timing'){
            $("#edit_timing"+id).hide();
            $("#timing"+id).show();
            $("#ok_timing"+id).show();
        }
    });

    /*
        delete tag & type & timing
    */
    
    $(".delete_by_id").click(function(){
        if(!confirm("Are you sure!")){
            return false;
        }
        var val = $(this).attr("data-value");
        var table = $(this).attr("data-table");
        var tag_id = $(this).attr("tag-id");
        var name = $("#"+tag_id).val();
        var function_name = "/ajax/delete_tag";
        if(table=='type'){
            function_name = "/ajax/delete_type";
            var tag_id = $(this).attr("type-id");
            var name = $("#"+tag_id).val();
        }
        else if(table=='timing'){
            function_name = "/ajax/delete_timing";
            var tag_id = $(this).attr("timing-id");
            var name = $("#"+tag_id).val();
        }
        var a = $.ajax({
            type: 'POST',
            url: siteurl+function_name,
            async:false,
            data: {id: val},
        }).responseText;

        if(a=='0'){

        }
        else
        {
            var nn = 'Tag';
            var msg = 'tag_update_msg';
            var row = '#'+table+'_row'+val;
            if(table=='type'){
                var nn = 'Type';
                var msg = 'type_update_msg';
            }
            else if(table=='timing'){
                var nn = 'Timing';
                var msg = 'timing_update_msg';
            }
            $(row).hide();
            $("#"+msg).html('('+name+') '+nn+' Deleted');
            $("#"+msg).fadeIn(200);
        }
    });

    $(".model header button").click(function(){
        $(".model footer").addClass("active");
    });

    $(".model1 header button").click(function(){
        $(".model1 footer").addClass("active");
    });

    $(".model2 header button").click(function(){
        $(".model2 footer").addClass("active");
    });


    /*
        add new type
    */
    
    $(".model footer button[name='add']").click(function(){
        $(this).html('Adding');
        var type = $.trim($(".model footer #new_type").val());
        if(type==""){
            alert("Please enter Type Name");
            return false;
        }
        var a = $.ajax({
            type: 'POST',
            url: siteurl+"ajax/add_types",
            async:false,
            data: {type:type},
        }).responseText;

        if(a!='0')
        {
            var len = $(".model  article.conent-body table tbody tr").length;
            $(".model footer").removeClass("active");
            var html = '<tr id="type_row'+a+'"><td>'+len+'</td><td><span class="edit_type" id="edit_type'+a+'">'+type+'</span><input class="editable_type" id="type'+a+'" value="'+type+'" type="text" style="display:none;"><span class="edit_done" id="ok_type'+a+'" type-id="type'+a+'" data-table="type" data-value="'+a+'" style="display:none;cursor:pointer">Ok</span></td><td class="pointer changestatus" style="width: 80px; font-size: 13px; color: rgb(75, 75, 75);" data-value="'+a+'" data-status="0">Deactivate</td><td class="pointer edit_by_id" type-id="type'+a+'" data-table="type" data-value="'+a+'" style="width: 32px; font-size: 13px; color: rgb(75, 75, 75);"><img src="'+siteurl+'images/b_edit.png" title="Update" alt="Update"> </td><td class="pointer delete_by_id" type-id="type'+a+'" data-table="type" data-value="'+a+'" style="width: 50px; font-size: 13px; color: rgb(75, 75, 75);"><img src="'+siteurl+'images/b_drop.png" title="Drop" alt="Drop"></td></tr>';
            $(".model  article.conent-body table tbody").append(html);
            $(".model footer #new_type").val("");


            /*
                init type disable/enable,edit,delete
            */
    
            $(".model .changestatus").click(function(){
                var val = $(this).attr("data-value");
                var status = $(this).attr("data-status");
                var a = $.ajax({
                    type: 'POST',
                    url: siteurl+"ajax/changestatus_of_types",
                    async:false,
                    data: {id: val,status:status},
                }).responseText;

                if(a=='0')
                {
                    $(this).html("Deactivate");
                    $(this).attr("data-status",0);
                }
                else
                {
                    $(this).html("Activate"); 
                    $(this).attr("data-status",1); 
                }
            });

            $(".edit_by_id").click(function(){
                var id = $(this).attr("data-value");
                var table = $(this).attr("data-table");
                $("#edit_type"+id).hide();
                $("#type"+id).show();
                $("#ok_type"+id).show();
            });    

            $(".edit_done").click(function(){
                var val = $(this).attr("data-value");
                var table = $(this).attr("data-table");
                function_name = "/ajax/edit_type";
                var tag_id = $(this).attr("type-id");
                var name = $.trim($("#"+tag_id).val());
                if(name=='')
                {
                    alert('This can not be blank!');
                    return false;
                }
                var a = $.ajax({
                    type: 'POST',
                    url: siteurl+function_name,
                    async:false,
                    data: {id: val,name:name},
                }).responseText;

                if(a=='0'){ }
                else
                {
                    var nn = 'Type ';
                    var msg = 'type_update_msg';
                    $("#"+msg).html(nn+'Updated ('+name+')');
                    $("#"+msg).fadeIn(200);
                    $("#edit_type"+val).show().html(name);
                    $("#type"+val).hide();
                    $("#ok_type"+val).hide();
                }
            });

            $(".delete_by_id").click(function(){
                if(!confirm("Are you sure!")){
                    return false;
                }
                var val = $(this).attr("data-value");
                var table = $(this).attr("data-table");
                function_name = "/ajax/delete_type";
                var tag_id = $(this).attr("type-id");
                var name = $("#"+tag_id).val();
                var a = $.ajax({
                    type: 'POST',
                    url: siteurl+function_name,
                    async:false,
                    data: {id: val},
                }).responseText;

                if(a=='0'){

                }
                else
                {
                    var nn = 'Type';
                    var msg = 'type_update_msg';
                    $("#type_row"+val).hide();
                    $("#"+msg).html('('+name+') '+nn+' Deleted');
                    $("#"+msg).fadeIn(200);
                }
            });


        }
        else if(a=='0')
        {      
            $(".model1 footer #new_tag").val("");
            alert("Type Name already exist"); 
        }
        $(this).html('Add');
    });

    /*
        add new tag
    */

    $(".model1 footer button[name='add']").click(function(){
        $(this).html('Adding');
        var name = $.trim($(".model1 footer #new_tag").val());
        if(name==""){
            alert("Please enter Tag Name");
            return false;
        }
        var a = $.ajax({
            type: 'POST',
            url: siteurl+"ajax/add_tags",
            async:false,
            data: {name:name},
        }).responseText;

        if(a!='0')
        {
            var len = $(".model1 article.conent-body table tbody tr").length;
            $(".model1 footer").removeClass("active");
            var html = '<tr id="tag_row'+a+'"><td>'+len+'</td><td><span class="edit_tag" id="edit_tag'+a+'">'+name+'</span><input class="editable_tag" id="tag'+a+'" value="'+name+'" type="text" style="display:none;"><span class="edit_done" id="ok_tag'+a+'" tag-id="tag'+a+'" data-table="tag" data-value="'+a+'" style="display:none;cursor:pointer">Ok</span></td><td class="pointer changestatus" style="width: 80px; font-size: 13px; color: rgb(75, 75, 75);" data-value="'+a+'" data-status="0">Deactivate</td><td class="pointer edit_by_id" tag-id="tag'+a+'" data-table="tag" data-value="'+a+'" style="width: 32px; font-size: 13px; color: rgb(75, 75, 75);"><img src="'+siteurl+'images/b_edit.png" title="Update" alt="Update"> </td><td class="pointer delete_by_id" tag-id="tag'+a+'" data-table="tag" data-value="'+a+'" style="width: 50px; font-size: 13px; color: rgb(75, 75, 75);"><img src="'+siteurl+'images/b_drop.png" title="Drop" alt="Drop"></td></tr>';
            $(".model1  article.conent-body table tbody").append(html);
            $(".model1 footer #new_tag").val("");

            /*
                init tag disable/enable,edit,delete
            */

            $(".model1 .changestatus").click(function(){
                var val = $(this).attr("data-value");
                var status = $(this).attr("data-status");
                var a = $.ajax({
                    type: 'POST',
                    url: siteurl+"ajax/changestatus_of_tags",
                    async:false,
                    data: {id: val,status:status},
                }).responseText;

                if(a=='0')
                {
                    $(this).html("Deactivate");
                    $(this).attr("data-status",0);
                }
                else
                {
                    $(this).html("Activate"); 
                    $(this).attr("data-status",1); 
                }
            });

            $(".edit_by_id").click(function(){
                var id = $(this).attr("data-value");
                var table = $(this).attr("data-table");
                $("#edit_tag"+id).hide();
                $("#tag"+id).show();
                $("#ok_tag"+id).show();
            });    

            $(".edit_done").click(function(){
                var val = $(this).attr("data-value");
                var table = $(this).attr("data-table");
                var tag_id = $(this).attr("tag-id");
                var name = $.trim($("#"+tag_id).val());
                var function_name = "/ajax/edit_tag";
                if(name=='')
                {
                    alert('This can not be blank!');
                    return false;
                }
                var a = $.ajax({
                    type: 'POST',
                    url: siteurl+function_name,
                    async:false,
                    data: {id: val,name:name},
                }).responseText;

                if(a=='0'){ }
                else
                {
                    var nn = 'Tag ';
                    var msg = 'tag_update_msg';
                    $("#"+msg).html(nn+'Updated ('+name+')');
                    $("#"+msg).fadeIn(200);
                    $("#edit_tag"+val).show().html(name);
                    $("#tag"+val).hide();
                    $("#ok_tag"+val).hide();
                }
            });

            $(".delete_by_id").click(function(){
                if(!confirm("Are you sure!")){
                    return false;
                }
                var val = $(this).attr("data-value");
                var table = $(this).attr("data-table");
                var tag_id = $(this).attr("tag-id");
                var name = $("#"+tag_id).val();
                var function_name = "/ajax/delete_tag";
                var a = $.ajax({
                    type: 'POST',
                    url: siteurl+function_name,
                    async:false,
                    data: {id: val},
                }).responseText;

                if(a=='0'){

                }
                else
                {
                    var nn = 'Tag';
                    var msg = 'tag_update_msg';
                    $("#tag_row"+val).hide();
                    $("#"+msg).html('('+name+') '+nn+' Deleted');
                    $("#"+msg).fadeIn(200);
                }
            });
        }
        else if(a=='0')
        {      
            $(".model1 footer #new_tag").val("");
            alert("Tag Name already exist"); 
        }
        $(this).html('Add');
    });

    /*
        add new timing
    */

    $(".model2 footer button[name='add']").click(function(){
        $(this).html('Adding');
        var name = $.trim($(".model2 footer #new_timing").val());
        if(name==""){
            alert("Please enter Timing");
            return false;
        }
        var a = $.ajax({
            type: 'POST',
            url: siteurl+"ajax/add_timing",
            async:false,
            data: {name:name},
        }).responseText;

        if(a!='0')
        {
            var len = $(".model2 article.conent-body table tbody tr").length;
            $(".model2 footer").removeClass("active");
            var html = '<tr id="timing_row'+a+'"><td>'+len+'</td><td><span class="edit_timing" id="edit_timing'+a+'">'+name+'</span><input class="editable_timing" id="timing'+a+'" value="'+name+'" type="text" style="display:none;"><span class="edit_done" id="ok_timing'+a+'" timing-id="timing'+a+'" data-table="timing" data-value="'+a+'" style="display:none;cursor:pointer">Ok</span></td><td class="pointer changestatus" style="width: 80px; font-size: 13px; color: rgb(75, 75, 75);" data-value="'+a+'" data-status="0">Deactivate</td><td class="pointer edit_by_id" timing-id="timing'+a+'" data-table="timing" data-value="'+a+'" style="width: 32px; font-size: 13px; color: rgb(75, 75, 75);"><img src="'+siteurl+'images/b_edit.png" title="Update" alt="Update"> </td><td class="pointer delete_by_id" timing-id="timing'+a+'" data-table="timing" data-value="'+a+'" style="width: 50px; font-size: 13px; color: rgb(75, 75, 75);"><img src="'+siteurl+'images/b_drop.png" title="Drop" alt="Drop"></td></tr>';
            $(".model2  article.conent-body table tbody").append(html);
            $(".model2 footer #new_tag").val("");

            /*
                init tag disable/enable,edit,delete
            */

            $(".model2 .changestatus").click(function(){
                var val = $(this).attr("data-value");
                var status = $(this).attr("data-status");
                var a = $.ajax({
                    type: 'POST',
                    url: siteurl+"ajax/changestatus_of_timing",
                    async:false,
                    data: {id: val,status:status},
                }).responseText;

                if(a=='0')
                {
                    $(this).html("Deactivate");
                    $(this).attr("data-status",0);
                }
                else
                {
                    $(this).html("Activate"); 
                    $(this).attr("data-status",1); 
                }
            });

            $(".edit_by_id").click(function(){
                var id = $(this).attr("data-value");
                var table = $(this).attr("data-table");
                $("#edit_timing"+id).hide();
                $("#timing"+id).show();
                $("#ok_timing"+id).show();
            });    

            $(".edit_done").click(function(){
                var val = $(this).attr("data-value");
                var table = $(this).attr("data-table");
                var tag_id = $(this).attr("timing-id");
                var name = $.trim($("#"+tag_id).val());
                var function_name = "/ajax/edit_timing";
                if(name=='')
                {
                    alert('This can not be blank!');
                    return false;
                }
                var a = $.ajax({
                    type: 'POST',
                    url: siteurl+function_name,
                    async:false,
                    data: {id: val,name:name},
                }).responseText;

                if(a=='0'){ }
                else
                {
                    var nn = 'Timing ';
                    var msg = 'timing_update_msg';
                    $("#"+msg).html(nn+'Updated ('+name+')');
                    $("#"+msg).fadeIn(200);
                    $("#edit_timing"+val).show().html(name);
                    $("#timing"+val).hide();
                    $("#ok_timing"+val).hide();
                }
            });

            $(".delete_by_id").click(function(){
                if(!confirm("Are you sure!")){
                    return false;
                }
                var val = $(this).attr("data-value");
                var table = $(this).attr("data-table");
                var tag_id = $(this).attr("timing-id");
                var name = $("#"+tag_id).val();
                var function_name = "/ajax/delete_timing";
                var a = $.ajax({
                    type: 'POST',
                    url: siteurl+function_name,
                    async:false,
                    data: {id: val},
                }).responseText;

                if(a=='0'){

                }
                else
                {
                    var nn = 'Timing ';
                    var msg = 'timing_update_msg';
                    $("#timing_row"+val).hide();
                    $("#"+msg).html('('+name+') '+nn+' Deleted');
                    $("#"+msg).fadeIn(200);
                }
            });
        }
        else if(a=='0')
        {      
            $(".model2 footer #new_timing").val("");
            alert("Timing already exist"); 
        }
        $(this).html('Add');
    });

    //media

    $(".media_lib button[role='trigger_file']").click(function(){
        $(".media_lib input[type='file']").trigger('click');
    });

    $(".media_lib input[type='file']").change(function(){
        $(".media_lib button[type='submit']").trigger('click');
    });

    function remove_current_a()
    {
        $(".filter-wrap .filter li a,.filter-wrap .bench form fieldset").removeClass("current");
    }

    $(".request_exercise article p").keyup(function(){
        $(".request_exercise header .alert").html('<p style="color:peru"><b>'+$(this).html().length+'</b></p>');
    });

    $(".request_exercise article p").keyup(function(){
        $(".request_exercise header .alert").html('<p style="color:peru"><b>'+$(this).html().length+'</b></p>');
    });

    $("#register .mm-drawer-form input[name='email'],#register .mm-drawer-form input[name='password']").on('keyup', function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
          $("#register .mm-drawer-form button").trigger("click");
        }
    });

    $("#login .root .mm-drawer-form input[name='email'],#login .root .mm-drawer-form input[name='password']").on('keyup', function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
           $("#login .mm-drawer-form button").trigger("click");
        }
    });
  
});









/*
    set style on window resize
*/
$(window).resize(function(){
    var siteurl = $("#siteurl").attr("siteurl");
    var ww = $(window).width();
    // make responsive header
    $("header.desktop[role='main']").css("width",ww+"px");


    var model_width = $(".popup").css("width");
    model_width = parseInt(model_width, 10);
    var setmodel = (ww-model_width)/2;
    if(ww<768)
        $(".popup").css("left",(setmodel-20)+"px");
    else
        $(".popup").css("left",setmodel+"px");

    /*
        handle big image
    */
    var big_img_ht = $("#mm-track-landing img").css("height");
   //. var title_ht = $("#mm-track-landing h1").css("height").replace(/[^-\d\.]/g, '');
    var title_ht = $("#mm-track-landing h1").css("height");
    var top = 0;
    top = (big_img_ht-title_ht)/2;
    $("#mm-track-landing h1").css("top",top+"px");

});


$(window).load(function(){
    /*
        handle big image
    */
    var big_img_ht = parseInt($("#mm-track-landing img").css("height"), 10);
    var title_ht = parseInt($("#mm-track-landing h1").css("height"), 10);
    var top = 0;
    top = (big_img_ht-title_ht)/2;
    $("#mm-track-landing h1").css("top",top+"px");
});



/*

javascript fuctions code here

*/

function doc_timing(_this,action)
{
    if(action==0)
        $(_this).siblings().show();
    else
        $(_this).siblings().hide();
}


function requestDoc(name,title,ttl,id)
{
    $(".request_exercise").addClass("active");
    $(".request_exercise header p.s_name b").html(name);
    $(".request_exercise article >p[contenteditable='true']").html(title);
    $(".soacial_popup_footer button").attr("onclick","share_exercise("+id+",'"+ttl+"',this);");
    $(".soacial_popup_footer button").attr("name",name);
    $(".overlay").addClass("active");
}

function share_exercise(id,ttl,e)

{
    var name = $(e).attr('name');
   
    
  
   // var action = '/linkedin/send';
    var text = $(".request_exercise article.conent-body p").html();

    if(name == 'Share on Twitter'){

        action = '/Twitter/send';
        if(text.length>120){
            alert('text count should be less than 120');
            return false;
        }
    }
    else if(name == 'Share on Facebook'){
        action = '/Fb/send';
    }
    else
    {
      
        action = '/Linkedin/send';
    }
    var siteurl = $("#siteurl").attr("siteurl");
   // var action = '/linkedin/send';

   
    $.ajax({ 

        type: "POST",
        url: siteurl+ action,
        data:{'id':id,'text':text},
        success: function(data){
            
          
            if(data=='0'){
                $(".request_exercise header .alert").html('<p style="color:red"><b>Exercise already shared!</b></p>');
            }
            else if(data=='1'){
                $(".request_exercise header .alert").html('<p style="color:green"><b>Exercise successfully shared!</b></p>');
                setTimeout(function() {
                    window.location = siteurl+"homes/sharethanks";
                }, 600);
    
                //confirm(siteurl+"homes/view_document?title="+ttl);
            } 
            else {
                $(".request_exercise header .alert").html('<p style="color:green"><b>work on Twitter share in maintenance</b></p>');
            }
        }
    });
}

function confirm(url)
{ 
    $(".model7").addClass("active");
    $(".confirm a#doc_view").attr("href",url);
    $(".overlay").addClass("active");
}

function t_and_c(url)
{
       $(".model5").addClass("active");
    var url = 'window.open("'+url+'","_blank", "width=340, height=400, resizable=yes, scrollbars=yes");';
    
    $(".soacial_popup_footer a").attr("onclick",url);

    $(".overlay").addClass("active");

}

function no_thanks()
{
    
    $(".overlay").trigger("click");
}

function mailchaimp()
{
    $(".mailchaimp").addClass("active");
    $(".overlay").addClass("active");    
}

function save_subscribe()
{
    var email = $.trim($("#mc_embed_signup [name='EMAIL']").val());
    if(email=='')
        return false;
    var fname = $.trim($("#mc_embed_signup [name='FNAME']").val());
    var lname = $.trim($("#mc_embed_signup [name='LNAME']").val());
    var access_token = $.trim($("#mc_embed_signup [name='MMERGE3']").val());
    var did = $.trim($("#DID").val());
    var action = '/ajax/save_subscribe';
    var siteurl = $("#siteurl").attr("siteurl");
    $.ajax({ 
        type: "POST",
        url: siteurl+action,
        data:{'email':email,'first_name':fname,'last_name':lname,'document_id':did,'access_token':access_token},
        success: function(data){
            if(data=='0'){
                return false;
            }
            else if(data=='1'){
                return true;
            }
        }
    });
}

function get_access_token()
{
    var email = $(".admin_link_page #email").val();
    if(!validateEmail(email)){
        alert("Please enter valid email!");
        return false;
    }

    var action = '/ajax/get_access_token';
    var siteurl = $("#siteurl").attr("siteurl");
    $.ajax({ 
        type: "POST",
        url: siteurl+action,
        data:{'email':email},
        success: function(data){
            $(".admin_link_page #access_token").html(data).show();
        }
    });
}

function validateEmail(sEmail) {
    var filter = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
    if (filter.test(sEmail))
        return true;
    else 
        return false;
}

function check_input()
{
    var password = $.trim($(".stripe_password input[name='password']").val());
    if(password=='')
    {
        $(".stripe_password header .alert").html('<p style="color:red"><b>Please enter an unique Password</b></p>');
        return false;
    }
}

function check_password()
{
           var new_password= $.trim($("#password").val()) ; 
           var confirm_password= $.trim($("#c_password").val());
          
           regx = /^.*(?=.{8,})(?=.*[A-Za-z])(?=.*[@#*!$%&]).*$/;
           regex = "/<>;:=%";
           if(new_password=="" || confirm_password==""){
              alert("All fields required")
               return false;
           }           
           if(!regx.test(new_password)){
               alert("MUST BE  AT LEAST 8 CHARACTERS AND A SPECIAL CHARACTER");
                return false;
            }
            if(new_password!=confirm_password){
             alert("Password and Confirm password does not match");
              return false;                  
           }
}
