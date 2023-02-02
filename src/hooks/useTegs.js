import {ref} from 'vue'

export function useTegs(array) {
  const tegs = (['mango','pineapple','orange','bluebery','citrus','flowers','diesel','tree','caustic','fruit','sour','strawberry','coffee','lime','lavender','lemon','honey','menthol','metal','mint','walnut','peper','spicy','sage','chocolate','skunk','sweet','resin','pine','cheese','tropical','vanilla','grape','apple','berry','earthy', 'chemical'])
  const images = ref([])
  const makeImages = (array)=>{
    images.value=[]
    if (array) {
      array.forEach(item => {
        switch (item) {
          case 'mango':
            images.value.push({title:'mango',img:'mango.svg'})
            break;
          case 'pineapple':
            images.value.push({title:'pineapple',img:'ananas.svg'})
            break;
          case 'orange':
            images.value.push({title:'orange',img:'apelsin.svg'})
            break;
          case 'bluebery':
          images.value.push({title:'bluebery',img:'chernika.svg'})
          break;
          case 'citrus':
          images.value.push({title:'citrus',img:'citrus.svg'})
          break;
          case 'flowers':
          images.value.push({title:'flowers',img:'cvetochnyj.svg'})
          break;
          case 'diesel':
          images.value.push({title:'diesel',img:'dizel.svg'})
          break;
          case 'tree':
          images.value.push({title:'tree',img:'drevesnyj.svg'})
          break;
          case 'caustic':
          images.value.push({title:'caustic',img:'edkij.svg'})
          break;
          case 'fruit tree':
          images.value.push({title:'fruit tree',img:'fruktovoe-derevo.svg'})
          break;
          case 'fruit':
          images.value.push({title:'fruit',img:'fruktovyj.svg'})
          break;
          case 'sour':
          images.value.push({title:'sour',img:'kislyj.svg'})
          break;
          case 'strawberry':
          images.value.push({title:'strawberry',img:'klubnika.svg'})
          break;
          case 'coffee':
          images.value.push({title:'coffee',img:'kofe.svg'})
          break;
          case 'lime':
          images.value.push({title:'lime',img:'lajm.svg'})
          break;
          case 'lavender':
          images.value.push({title:'lavender',img:'lavanda.svg'})
          break;
          case 'lemon':
          images.value.push({title:'lemon',img:'limon.svg'})
          break;
          case 'honey':
          images.value.push({title:'honey',img:'med.svg'})
          break;
          case 'menthol':
          images.value.push({title:'menthol',img:'mentol.svg'})
          break;
          case 'metal':
          images.value.push({title:'metal',img:'metall.svg'})
          break;
          case 'mint':
          images.value.push({title:'mint',img:'myata.svg'})
          break;
          case 'walnut':
          images.value.push({title:'walnut',img:'orekhovyj.svg'})
          break;
          case 'peper':
          images.value.push({title:'peper',img:'perec.svg'})
          break;
          case 'spicy':
          images.value.push({title:'spicy',img:'pryanyj.svg'})
          break;
          case 'sage':
          images.value.push({title:'sage',img:'shalfej.svg'})
          break;
          case 'chocolate':
          images.value.push({title:'chocolate',img:'shokolad.svg'})
          break;
          case 'skunk':
          images.value.push({title:'skunk',img:'skunk.svg'})
          break;
          case 'sweet':
          images.value.push({title:'sweet',img:'sladkij.svg'})
          break;
          case 'resin':
          images.value.push({title:'resin',img:'smola.svg'})
          break;
          case 'pine':
          images.value.push({title:'pine',img:'sosna.svg'})
          break;
          case 'cheese':
          images.value.push({title:'cheese',img:'syr.svg'})
          break;
          case 'tropical':
          images.value.push({title:'tropical',img:'tropicheskij.svg'})
          break;
          case 'vanilla':
          images.value.push({title:'vanilla',img:'vanil.svg'})
          break;
          case 'grape':
          images.value.push({title:'grape',img:'vinograd.svg'})
          break;
          case 'apple':
          images.value.push({title:'apple',img:'yabloko.svg'})
          break;
          case 'berry':
          images.value.push({title:'berry',img:'yagoda.svg'})
          break;
          case 'earthy':
          images.value.push({title:'earthy',img:'zemlistyj.svg'})
          break;
          case 'chemical':
          images.value.push({title:'chemical',img:'himicheskij.svg'})
          break;
        }
      })
  }
}

  return {
    images, makeImages, tegs
  }
}