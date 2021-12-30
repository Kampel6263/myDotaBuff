import React, { useEffect, useState } from "react";
import { HeroeProps } from "../heroes.component";
import classes from './hero-attr.module.scss'

type HeroAttrProps = {
    data: HeroeProps;
    type: 'int'| 'str' | 'agi'
}

const HeroAttr:React.FC<HeroAttrProps> = ({data, type}) =>{
    let defaultLink = 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/'
   const [heroesImg, setHeroesImg] =  useState('')
    useEffect(()=>{
        switch (data.localized_name){
            case 'Wraith King':
                setHeroesImg('skeleton_king')
                break
                
                case 'Clockwerk':
                setHeroesImg('rattletrap')
                break
                case 'Lifestealer':
                setHeroesImg('life_stealer')
                break
                case 'Doom':
                setHeroesImg('doom_bringer')
                break
                // case 'Clockwerk':
                // setHeroesImg('rattletrap')
                // break
                // case 'Clockwerk':
                // setHeroesImg('rattletrap')
                // break
            default:
                setHeroesImg(data.localized_name.toLowerCase().replace('-','').replace(' ', '_'))
        }
       
    }, [])

    const attr = {
        int: {name: 'Intelligence', img: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_intelligence.png'} ,
        str: {name: 'Strength', img: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_strength.png'},
        agi: {name: 'Agility', img: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_agility.png'}
    }

    // console.log(`https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${data.localized_name.toLowerCase().replace('-','').replace(' ', '_')}.png`)

    if(data.primary_attr === type){
        return <div className={classes.hero}>
        <img className={classes.heroImg} src={defaultLink + heroesImg + '.png' ? defaultLink + heroesImg + '.png' : `https://complianz.io/wp-content/uploads/2019/03/placeholder-300x202.jpg`} alt="" />
            <div className={classes.text}>
            <div className={classes.attr}> 
                <img  src={attr[data.primary_attr].img} alt="" />
                <div>{data.localized_name}</div>
             </div>
            </div>
            
    </div>
    }
    return <React.Fragment></React.Fragment>

    
}

export default HeroAttr