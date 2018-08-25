function starWars(){
    this.current_mode='';
    this.your_Ap=0;
    this.your_Hp=0;
    this.enemy_Hp=0;
    this.number_attack=0;
    this.your_index=0;
    this.enemy_index=0;
    this.chosen_index = 0;
    this.chosen_character=[];
    this.your_character=[];
    this.enemy_character=[];
    this.remain_character=[];
    this.save_character=[];
    this.character = [
        {
            name: "Obi Wan Kenobi", 
            healthPower: 120, 
            attackPower: 8, 
            counterAttackPower: 15, 
            img1: ["assets/images/obiwan1.png","300",""],
            img2: ["assets/images/obiwan3.png","500","-200"],
            img3: ["assets/images/obiwan2.png","300",""]
        },

        {
            name: "Luke Skywalker", 
            healthPower: 100, 
            attackPower: 14, 
            counterAttackPower: 5, 
            img1: ["assets/images/luke1.png","200",""],
            img2: ["assets/images/luke2.png","300",""],
            img3: ["assets/images/luke2.png","300",""]
        },

        {
            name: "Rey", 
            healthPower: 150, 
            attackPower: 8, 
            counterAttackPower: 20, 
            img1: ["assets/images/rey1.png","300",""],
            img2: ["assets/images/rey2.png","400","-45"],
            img3: ["assets/images/rey3.png","500","-45"]
        },
        
        {
            name: "Kylo Ren", 
            healthPower: 180, 
            attackPower: 7, 
            counterAttackPower: 25, 
            img1: ["assets/images/kylo1.png","300",""],
            img2: ["assets/images/kylo2.png","350",""],
            img3: ["assets/images/kylo3.png","450","-60"]
        }
    ];
    this.save_character=this.character;
    this.remain_character=this.character;
    this.step1={section_name: "Select Your Character"};
    this.step2={section_name: "Enemies Available To Attack"};
    
    //music background when start
    /*this.embed = '';
    this.bg_sound = "assets/mp3/bg.mp3";
    this.correct_sound = "assets/mp3/tick.mp3";
    this.win_sound = "assets/mp3/win.mp3";
    this.lose_sound = "assets/mp3/lose.mp3";*/
    //click play button
    this.play=function(selected_index){
        $('.section1 .character_image').css({'margin-left':'0'});
        
        this.chosen_character=this.remain_character[selected_index];
        if(this.current_mode==="step1"){
            this.your_index=this.chosen_index;
            this.your_character=this.chosen_character;
            $('.section1 .section_name').text(this.step1.section_name);
        }else if(this.current_mode==="step2"){
            this.enemy_index=this.chosen_index;
            this.enemy_character=this.chosen_character;
            $('.section1 .section_name').text(this.step2.section_name);
        }
        
        $('.section1 .character_name').text(this.chosen_character.name);
        $('.section1 .health_power').text(this.chosen_character.healthPower);
        $('.section1 .attack_power').text(this.chosen_character.attackPower);
        $('.section1 .counter_attack_power').text(this.chosen_character.counterAttackPower);
        $('.section1 .character_image').css({'max-width':this.chosen_character.img1[1]+'px'}).attr('src',this.chosen_character.img1[0]);
    }
    this.shuffle=function(current_mode){
        if(current_mode==="step1"){
            this.chosen_index = Math.floor(Math.random() * this.character.length);
        }else{
            this.chosen_index = Math.floor(Math.random() * this.remain_character.length);
        }
        
        return this.chosen_index;
    }
    this.update_character=function(chosen_index){
        var j=0;
        var tmp=[];
        if(this.remain_character.length>=2){
            for(var i=0;i<this.remain_character.length;i++){
                if(i!=chosen_index){
                    tmp[j]=this.remain_character[i];
                    j++;   
                }
            }
            this.remain_character=[];
            for(var i=0;i<tmp.length;i++){
                this.remain_character[i]=tmp[i];
            }
        }else{
            this.remain_character=[];
        }
    }
    this.attackMode=function(){
        $('.section1').hide();
        $('.section2').show().css({'display':'flex'});
        $('.your_info_scr .info_block .info_text').text(this.your_character.name + " (YOU)");
        $('.your_info_scr .hp_block .health_power').text(this.your_character.healthPower);
        $('.your_info_scr .ap_block .attack_power').text(this.your_character.attackPower);
        $('.your_info_scr .cap_block .counter_attack_power').text(this.your_character.counterAttackPower);
        if(this.your_character.img2[2]!==""){$('.your_info_scr .character_image_scr .character_image').css({'max-width': this.your_character.img2[1]+'px','margin-left': this.your_character.img2[2]+'px'});
        }else{$('.section2 .character_image').css({'max-width': this.your_character.img2[1]+'px'});
        }
        $('.your_info_scr .character_image_scr .character_image').attr('src',this.your_character.img3[0]);


        $('.enemy_info_scr .info_block .info_text').text(this.enemy_character.name);
        $('.enemy_info_scr .hp_block .health_power').text(this.enemy_character.healthPower);
        $('.enemy_info_scr .ap_block .attack_power').text(this.enemy_character.attackPower);
        $('.enemy_info_scr .cap_block .counter_attack_power').text(this.enemy_character.counterAttackPower);
        if(this.enemy_character.img2[2]!==""){$('.enemy_info_scr .character_image_scr .character_image').css({'max-width': this.enemy_character.img2[1]+'px','margin-left': this.enemy_character.img2[2]+'px'});
        }else{$('.section2 .character_image').css({'max-width': this.enemy_character.img2[1]+'px'});
        }
        $('.enemy_info_scr .character_image_scr .character_image').attr('src',this.enemy_character.img3[0]);

        this.enemy_Hp=this.enemy_character.healthPower;
        
    }
    this.attack=function(){
        //increase attacker's attackPower
        this.number_attack++;
        this.your_Ap=this.your_character.attackPower*this.number_attack;
		//this.your_character.attackPower = this.your_character.attackPower;
		this.enemy_Hp -= this.your_Ap; //decrease defender hp

		if(this.enemy_Hp <= 0){//if enemy dies
            if(this.remain_character.length == 0){//if no more enemy left, you won
                $('.section2 .section_name').html("<p>You Won!!!</p>");
                $(".attack_btn_scr").css("display", "none");
				$(".restart_btn_scr").css("display", "block");
            }else{ //if more enemies are left keep going
                
                $('.section2 .section_name').html("<p>You have defeated " + this.enemy_character.name + ", you can choose to fight another enemy.</p>");
                setTimeout(function(){
                    $('.section2').hide();
                    player.chosen_index = player.shuffle(player.current_mode);
                    $('.section1 .go_select').text("SELECT");
                    player.play(player.chosen_index);
                    $('.section1').show();
                    //$('.section1 .go_select').click();
                },2000);
			}

		}else{ //if enemy still alive
			$(".enemy_info_scr .hp_block .health_power").text(this.enemy_Hp); //update defender hp on screen
            this.your_character.healthPower -= this.enemy_character.counterAttackPower; //decrease attacker hp
			$(".your_info_scr .hp_block .health_power").text(this.your_character.healthPower); //update attacker hp on screen
			if(this.your_character.healthPower > 0){ //if I still alive
				$('.section2 .section_name').html("<p>You attacked " + this.enemy_character.name + " for "+ this.your_Ap + " damage. <br>" +
				this.enemy_character.name + " attacked you back for "+ this.enemy_character.counterAttackPower + " damage.</p>");
			}else{ //I'm lost
                $('.section2 .section_name').html("<p>You have been defeated...</P>");
				$(".attack_btn_scr").css("display", "none");
				$(".restart_btn_scr").css("display", "block");
			}
		}
    }
    

}

var player = new starWars();
player.current_mode="step1";
player.chosen_index = player.shuffle(player.current_mode);

player.play(player.chosen_index,"step1");
//player.playMp3('bg',player.bg_sound,"true");
function restart_game(){
    $('.section2').hide();
    

    player.current_mode="step1";
    player.your_Ap=0;
    player.enemy_Hp=0;
    player.number_attack=0;
    player.your_index=0;
    player.enemy_index=0;
    player.chosen_index = 0;

    player.chosen_character=[];
    player.your_character=[];
    player.enemy_character=[];

    console.log(player.remain_character);
    player.remain_character=player.save_character;
    console.log(player.remain_character);
    player.chosen_index = player.shuffle(player.current_mode);
    player.play(player.chosen_index,"step1");
    $('.section1 .go_select').text("SELECT").attr('data-value','step1');

    $('.section1').show();
    console.log(player.character);
    console.log(player.chosen_character);
    console.log(player.your_character);
    console.log(player.enemy_character);
    
    
}
$(document).ready(function(){
    $('.section1 .go_select').on('click',function(e){
        e.preventDefault();
        player.current_mode=$(this).attr('data-value');
        
        $(this).html('<img src="assets/images/loader.gif" style="max-width:132px">');
        $('.section1 .character_image').hide();
        if(player.chosen_character.img2[2]!==""){$('.section1 .character_image').css({'max-width': player.chosen_character.img2[1]+'px','margin-left': player.chosen_character.img2[2]+'px'});
        }else{$('.section1 .character_image').css({'max-width': player.chosen_character.img2[1]+'px'});
        }
        
        $('.section1 .character_image').attr('src', player.chosen_character.img2[0]);
        $('.section1 .character_image').show();

        if(player.current_mode=="step1"){
            player.your_index=player.chosen_index;
            player.current_mode="step2";
            
            player.update_character(player.your_index);
            setTimeout(function(){
                player.chosen_index = player.shuffle(player.current_mode);
                
                $('.section1 .go_select').text("SELECT").attr('data-value',player.current_mode);
                player.play(player.chosen_index);
            },500);
        }else if(player.current_mode=="step2"){
            player.enemy_index=player.chosen_index;
            player.update_character(player.enemy_index);
            setTimeout(function(){
                player.attackMode();
            },500);
        }
    });
   
    $('.right').on('click',function(e){
        e.preventDefault();
        player.chosen_index=player.chosen_index+1;
        if(player.chosen_index===player.remain_character.length){player.chosen_index=0;}
        player.play(player.chosen_index);
    });
    $('.left').on('click',function(e){
        e.preventDefault();
        player.chosen_index=player.chosen_index-1;
        if(player.chosen_index===-1){player.chosen_index=player.remain_character.length-1;}
        player.play(player.chosen_index);
    });
    $('.attack_btn_scr').on('click',function(e){
        e.preventDefault();
        player.attack();
    });
    $('.restart_btn_scr').on('click',function(e){
        e.preventDefault();
        restart_game();
    });
})
