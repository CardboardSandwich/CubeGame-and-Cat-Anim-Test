import kaboom from "https://unpkg.com/kaboom@3000.0.1/dist/kaboom.mjs";

kaboom();

loadSound("jump", "sounds/jump.mp3")
loadSound("BG", "sounds/birds.mp3")

loadSprite("coin", "sprites/coin.png")
loadSprite("cat", "sprites/spritesheet.png", {
    sliceX: 8,
    sliceY: 10,
    anims: {
        idle:{
            from:0,
            to: 3,
            loop:true
        },
        walk:{
            from:32,
            to:39,
        },
        run:{
            from:40,
            to:47,
        },
        jump:{
            from:65,
            to:65,
        },
        fall:{
            from:65,
            to:65,
        }
        
    }
})



scene("sprite_test", ()=> {
    setGravity(800)

    add([
        rect(width(), height()),
        color(250,250,250),
        pos(0,0)
    ])

    const ground = add([
        rect(width(),50),
        color(0, 0, 0),
        pos(0,height()-25),
        area(),
        body({isStatic: true}),
    ])

    const player = add([
        sprite("cat"),
        scale(10),
        pos(0,0),
        anchor(vec2(-0.1,0.6)),
        area({scale:0.47,offset:new vec2(0.6,7.2)}),
        body()
    ])

    add([
        rect(500, 200),
        color(0,0,0),
        pos(width()/2,800),
        area(),
        body({isStatic: true}),
    ])

    const music = play("BG",{loop:true,volume:0.35})

    onUpdate(() =>{
        
        if (!player.isGrounded() && player.curAnim() !== "fall"){
            player.play("fall")
        }
        else if(player.isGrounded() && player.curAnim() == "fall"){
            player.play("idle")
        }
    })

    onKeyDown("space", ()=> {
        if (player.isGrounded()){
            player.jump(550)
            if (player.curAnim() !== "jump") {
                player.play("jump")
                play("jump")
            }
        }
    })



    onKeyDown("d", ()=> {
        player.move(400,0)
        player.flipX = false
        if (player.isGrounded() && player.curAnim() !== "run") {
            player.play("run")
        }
    })

    onKeyDown("a", ()=> {
        player.move(-400,0)
        player.flipX = true
        if (player.isGrounded() && player.curAnim() !== "run") {
            player.play("run")
        }
    })

    ;["a", "d","space"].forEach((key) => {
        onKeyRelease(key, () => {
            if (player.isGrounded() && !isKeyDown("a") && !isKeyDown("d") && !isKeyDown("space")) {
                player.play("idle")
            }
        })
    })
})






scene("scene1", () =>{
    //set gravity
    setGravity(800)
    //add bg color
    add([
        rect(width(), height()),
        color(135,206,235),
        pos(0,0),
    ])
    

    //add platform 2
    add([
        rect(300, 50),
        color(0,0,0),
        pos(width()/2-40,height()/2),
        area(),// collider
        body({isStatic:true}),

    ])

    //add platform 1
    add([
        rect(200, 50),
        color(0,0,0),
        pos(475,650),
        area(),// collider
        body({isStatic:true}),
    ])

    
    
    //add platform 4

    add([
        rect(200, 50),
        color(0,0,0),
        pos(1725,325),
        area(),// collider
        body({isStatic:true}),
    ])

    //add platform 3

    add([
        rect(200, 50),
        color(0,0,0),
        pos(1415,425),
        area(),// collider
        body({isStatic:true}),
    ])

    const startingplatform = add([
        rect(300, 50),
        color(0,0,0),
        pos(0, height()/2),
        area(),// collider
        body({isStatic:true}),
    ])
    //add player
    const player = add([
        rect(100,100),
        color(255, 255, 255),
        pos(0,0),
        area(),// collider
        body(),// gravity
    ])

    onUpdate(()=>{
        if (player.pos.y >= height()){
            go("lose")
        }

        
    })

    player.onCollide("coin", ()=>{
        go("scene2")
    })

    //controls
    onKeyDown("space", ()=>{
        if (player.isGrounded()){
            player.jump(600)
        }
        
    })

    onKeyDown("d", ()=>{
        player.move(270,0)
    })

    onKeyDown("a", ()=>{
        player.move(-270,0)
    })


    // add collectable
    add([
        sprite("coin"),
        scale(1.5),
        pos(1625,-400),
        area({scale: vec2(0.15,0.35), offset:vec2(729,160)}),
        body(),
        "coin"

    ])
    //add some text
    add([
        text("Hello world!", 24),
        pos(0,0),
        color(0,0,0),
    ])

})



    // SCENE2 SCENE2 SCENE2 SCENE2 SCENE2 SCENE2 SCENE2 SCENE2 SCENE2 SCENE2
    // SCENE2 SCENE2 SCENE2 SCENE2 SCENE2 SCENE2 SCENE2 SCENE2 SCENE2 SCENE2
    // SCENE2 SCENE2 SCENE2 SCENE2 SCENE2 SCENE2 SCENE2 SCENE2 SCENE2 SCENE2
    // SCENE2 SCENE2 SCENE2 SCENE2 SCENE2 SCENE2 SCENE2 SCENE2 SCENE2 SCENE2
    // SCENE2 SCENE2 SCENE2 SCENE2 SCENE2 SCENE2 SCENE2 SCENE2 SCENE2 SCENE2



scene("scene2", () =>{
    //set gravity
    setGravity(800)
    //add bg color
    add([
        rect(width(), height()),
        color(135,206,235),
        pos(0,0),
    ])
    


    //add platform 1
    add([
        rect(50,500),
        color(0,0,0),
        pos(475,650),
        area(),// collider
        body({isStatic:true}),
    ])

    //add platform 1
    add([
        rect(50,600),
        color(0,0,0),
        pos(305,550),
        area(),// collider
        body({isStatic:true}),
    ])

    //add platform 2
    const moving_plat1 = add([
        rect(75,600),
        color(40,40,40),
        pos(1450,650),
        area(),// collider
        body({isStatic:true}),
    ])

    //add platform 3
    add([
        rect(125,500),
        color(0,0,0),
        pos(1525,650),
        area(),// collider
        body({isStatic:true}),
    ])



    
    

    const startingplatform = add([
        rect(150, 500),
        color(0,0,0),
        pos(0, height()/2),
        area(),// collider
        body({isStatic:true}),
    ])
    //add player
    const player = add([
        rect(100,100),
        color(255, 255, 255),
        pos(0,0),
        area(),// collider
        body(),// gravity
    ])


    let direction = 40
    onUpdate(()=>{
        if (player.pos.y >= height()){
            go("lose")
        }

        if (moving_plat1.pos.x >= 1450){
            direction = -50
        }

        if (moving_plat1.pos.x <= 525){
            direction = 50
        }
        moving_plat1.move(direction,0)
        

        
    })

    player.onCollide("coin", ()=>{
        go("scene3")
    })

    player.onCollide("kill", ()=>{
        go("lose")
    })

    //controls
    onKeyDown("space", ()=>{
        if (player.isGrounded()){
            player.jump(150)
        }
        
    })

    onKeyDown("d", ()=>{
        player.move(270,0)
    })

    onKeyDown("a", ()=>{
        player.move(-270,0)
    })


    // add collectable
    add([
        sprite("coin"),
        scale(1.5),
        pos(1400,-400),
        area({scale: vec2(0.15,0.35), offset:vec2(729,160)}),
        body(),
        "coin"

    ])
    //add some text
    add([
        text("Hello world!", 24),
        pos(0,0),
        color(0,0,0),
    ])
})



    // SCENE2 SCENE2 SCENE2 SCENE2 SCENE2 SCENE2 SCENE2 SCENE2 SCENE2 SCENE2
    // SCENE2 SCENE2 SCENE2 SCENE2 SCENE2 SCENE2 SCENE2 SCENE2 SCENE2 SCENE2
    // SCENE2 SCENE2 SCENE2 SCENE2 SCENE2 SCENE2 SCENE2 SCENE2 SCENE2 SCENE2
    // SCENE2 SCENE2 SCENE2 SCENE2 SCENE2 SCENE2 SCENE2 SCENE2 SCENE2 SCENE2
    // SCENE2 SCENE2 SCENE2 SCENE2 SCENE2 SCENE2 SCENE2 SCENE2 SCENE2 SCENE2



scene("scene3", () =>{
    //set gravity
    setGravity(800)
    //add bg color
    add([
        rect(width(), height()),
        color(135,206,235),
        pos(0,0),
    ])
    


    //add platform 1
    add([
        rect(250,50),
        color(0,0,0),
        pos(475,650),
        area(),// collider
        body({isStatic:true}),
    ])
    
    add([
        rect(1150,50),
        color(0,0,0),
        pos(425,250),
        area(),// collider
        body({isStatic:true})
    ])

    add([
        rect(1150,50),
        color(0,0,0),
        pos(425,650),
        area(),// collider
        body({isStatic:true})
    ])

    add([
        rect(50,110),
        color(255,0,0),
        pos(600,540),
        area(),// collider
        body({isStatic:true}),
        "kill"
    ])

    add([
        rect(50,110),
        color(255,0,0),
        pos(800,300),
        area(),// collider
        body({isStatic:true}),
        "kill"
    ])

    add([
        rect(50,110),
        color(255,0,0),
        pos(1000,540),
        area(),// collider
        body({isStatic:true}),
        "kill"
    ])

    add([
        rect(50,110),
        color(255,0,0),
        pos(1200,300),
        area(),// collider
        body({isStatic:true}),
        "kill"
    ])

    add([
        rect(50,110),
        color(255,0,0),
        pos(1400,540),
        area(),// collider
        body({isStatic:true}),
        "kill"
    ])

    add([
        rect(300,50),
        color(0,0,0),
        pos(1700,500),
        area(),// collider
        body({isStatic:true}),
        "vanish"
    ])

    const startingplatform = add([
        rect(300, 50),
        color(0,0,0),
        pos(0, 500),
        area(),// collider
        body({isStatic:true}),
    ])
    //add player
    const player = add([
        rect(100,100),
        color(255, 255, 255),
        pos(0,400),
        area(),// collider
        body(),// gravity
    ])



    onUpdate(()=>{
        if (player.pos.y >= height()){
            go("lose")
        }
    })

    player.onCollide("coin", ()=>{
        go("scene4")
    })

    player.onCollide("kill", ()=>{
        go("lose")
    })


    //controls
    onKeyDown("space", ()=>{
        if (player.isGrounded()){
            player.jump(600)
        }
        
    })

    onKeyDown("d", ()=>{
        player.move(270,0)
    })

    onKeyDown("a", ()=>{
        player.move(-270,0)
    })


    // add collectable
    add([
        sprite("coin"),
        scale(1.5),
        pos(1650,-400),
        area({scale: vec2(0.15,0.35), offset:vec2(729,160)}),
        body(),
        "coin"

    ])
    //add some text
    add([
        text("Hello world!", 24),
        pos(0,0),
        color(0,0,0),
    ])
})

//SCENE 4 SCENE 4 SCENE 4 SCENE 4 SCENE 4 SCENE 4 SCENE 4 SCENE 4 SCENE 4 
//SCENE 4 SCENE 4 SCENE 4 SCENE 4 SCENE 4 SCENE 4 SCENE 4 SCENE 4 SCENE 4 
//SCENE 4 SCENE 4 SCENE 4 SCENE 4 SCENE 4 SCENE 4 SCENE 4 SCENE 4 SCENE 4 
//SCENE 4 SCENE 4 SCENE 4 SCENE 4 SCENE 4 SCENE 4 SCENE 4 SCENE 4 SCENE 4 
//SCENE 4 SCENE 4 SCENE 4 SCENE 4 SCENE 4 SCENE 4 SCENE 4 SCENE 4 SCENE 4 

scene("scene4", () =>{
    //set gravity
    setGravity(800)
    //add bg color
    add([
        rect(width(), height()),
        color(135,206,235),
        pos(0,0),
    ])
    





    //add platform 2
    add([
        rect(50,600),
        color(180,180,180),
        pos(600,650),
        area(),// collider
        body({isStatic:true}),
        "vanish"
    ])

    //add platform 2
    add([
        rect(50,600),
        color(180,180,180),
        pos(300,650),
        area(),// collider
        body({isStatic:true}),
        "vanish"
    ])

    //add platform 2
    add([
        rect(50,600),
        color(180,180,180),
        pos(750,650),
        area(),// collider
        body({isStatic:true}),
        "vanish"
    ])

    //add platform 3
    add([
        rect(50,600),
        color(180,180,180),
        pos(900,650),
        area(),// collider
        body({isStatic:true}),
        "vanish"
    ])

    //add platform 3
    add([
        rect(50,600),
        color(180,180,180),
        pos(120,650),
        area(),// collider
        body({isStatic:true}),
        "vanish"
    ])

    //add platform 3
    add([
        rect(50,600),
        color(180,180,180),
        pos(1200,650),
        area(),// collider
        body({isStatic:true}),
        "vanish"
    ])

    //add platform 3
    add([
        rect(50,600),
        color(180,180,180),
        pos(1050,650),
        area(),// collider
        body({isStatic:true}),
        "vanish"
    ])

    //add platform 3
    add([
        rect(50,600),
        color(180,180,180),
        pos(1350,650),
        area(),// collider
        body({isStatic:true}),
        "vanish"
    ])

    //add platform 3
    add([
        rect(50,600),
        color(180,180,180),
        pos(1500,650),
        area(),// collider
        body({isStatic:true}),
        "vanish"
    ])

    //add platform 3
    add([
        rect(50,600),
        color(180,180,180),
        pos(1650,650),
        area(),// collider
        body({isStatic:true}),
        "vanish"
    ])

    add([
        rect(225,100),
        color(180,180,180),
        pos(1800,650),
        area(),// collider
        body({isStatic:true}),
        "vanish"
    ])

    const startingplatform = add([
        rect(150, 500),
        color(0,0,0),
        pos(0, height()/2),
        area(),// collider
        body({isStatic:true}),
    ])
    //add player
    const player = add([
        rect(100,100),
        color(255, 255, 255),
        pos(0,0),
        area(),// collider
        body(),// gravity
    ])


    
    onUpdate(()=>{
        if (player.pos.y >= height()){
            go("lose")
        }
        

        
    })

    player.onCollide("coin", ()=>{
        go("scene3")
    })

    player.onCollide("kill", ()=>{
        go("lose")
    })

    player.onCollide("vanish", (block) =>{
        destroy(block)
    })

    //controls
    onKeyDown("space", ()=>{
        if (player.isGrounded()){
            player.jump(150)
        }
        
    })

    onKeyDown("d", ()=>{
        player.move(270,0)
    })

    onKeyDown("a", ()=>{
        player.move(-270,0)
    })


    // add collectable
    add([
        sprite("coin"),
        scale(1.5),
        pos(1900,0),
        area({scale: vec2(0.15,0.35), offset:vec2(729,160)}),
        body(),
        "coin"

    ])
    //add some text
    add([
        text("Hello world!", 24),
        pos(0,0),
        color(0,0,0),
    ])
})


//GAME OVER GAME OVER GAME OVER GAME OVER GAME OVER GAME OVER GAME OVER GAME OVER GAME OVER 
//GAME OVER GAME OVER GAME OVER GAME OVER GAME OVER GAME OVER GAME OVER GAME OVER GAME OVER 
//GAME OVER GAME OVER GAME OVER GAME OVER GAME OVER GAME OVER GAME OVER GAME OVER GAME OVER 
//GAME OVER GAME OVER GAME OVER GAME OVER GAME OVER GAME OVER GAME OVER GAME OVER GAME OVER 
//GAME OVER GAME OVER GAME OVER GAME OVER GAME OVER GAME OVER GAME OVER GAME OVER GAME OVER 

scene("lose", () =>{

    //add bg color
    add([
        rect(width(), height()),
        color(0,0,0),
        pos(0,0),
    ])

    onUpdate(()=>{
        
    })

    //controls
    onKeyDown("space", ()=>{
        go("scene1")
    })


    //add some text
    add([
        text("GAME OVER", 96),
        pos(width()/2-100,height()/2-70),
        color(255,255,255),
    ])

    add([
        text("Press SPACE to restart.", 24),
        pos(width()/2-220,height()/2-20),
        color(255,255,255),
    ])
})

go("sprite_test")