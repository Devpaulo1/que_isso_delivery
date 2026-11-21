import type { Coffee } from '@/types/coffee'
import arabe from '@/assets/img/arabe.png'
import cafeComLeite from '@/assets/img/cafe-com-leite.png'
import capuccino from '@/assets/img/capuccino.png'
import chocolateQuente from '@/assets/img/chocolate-quente.png'
import cubano from '@/assets/img/cubano.png'
import expressoAmericano from '@/assets/img/expresso-americano.png'
import expressoCremoso from '@/assets/img/expresso-cremoso.png'
import expressoGelado from '@/assets/img/expresso-gelado.png'
import expressoTradicional from '@/assets/img/expresso-tradicional.png'
import havaiano from '@/assets/img/havaiano.png'
import irlandes from '@/assets/img/irlandes.png'
import latte from '@/assets/img/latte.png'
import macchiato from '@/assets/img/macchiato.png'
import mocaccino from '@/assets/img/mocaccino.png'

/**
 * Catálogo local e tipado (RN-08). Preços em centavos inteiros (RN-04).
 * Ilustrações PNG originais do projeto (DP-06).
 */
export const coffees: readonly Coffee[] = [
  {
    id: 'expresso-tradicional',
    name: 'Expresso Tradicional',
    description: 'O tradicional café feito com água quente e grãos moídos',
    priceInCents: 990,
    image: expressoTradicional,
    tags: ['Tradicional'],
    category: 'traditional',
  },
  {
    id: 'expresso-americano',
    name: 'Expresso Americano',
    description: 'Expresso diluído, menos intenso que o tradicional',
    priceInCents: 990,
    image: expressoAmericano,
    tags: ['Tradicional'],
    category: 'traditional',
  },
  {
    id: 'expresso-cremoso',
    name: 'Expresso Cremoso',
    description: 'Café expresso tradicional com espuma cremosa',
    priceInCents: 1090,
    image: expressoCremoso,
    tags: ['Tradicional'],
    category: 'traditional',
  },
  {
    id: 'expresso-gelado',
    name: 'Expresso Gelado',
    description: 'Bebida preparada com café expresso e cubos de gelo',
    priceInCents: 1190,
    image: expressoGelado,
    tags: ['Tradicional', 'Gelado'],
    category: 'iced',
  },
  {
    id: 'cafe-com-leite',
    name: 'Café com Leite',
    description: 'Meio a meio de expresso tradicional com leite vaporizado',
    priceInCents: 1090,
    image: cafeComLeite,
    tags: ['Tradicional', 'Com leite'],
    category: 'with-milk',
  },
  {
    id: 'latte',
    name: 'Latte',
    description: 'Uma dose de café expresso com o dobro de leite e espuma cremosa',
    priceInCents: 1290,
    image: latte,
    tags: ['Tradicional', 'Com leite'],
    category: 'with-milk',
  },
  {
    id: 'capuccino',
    name: 'Capuccino',
    description: 'Bebida com canela feita de doses iguais de café, leite e espuma',
    priceInCents: 1290,
    image: capuccino,
    tags: ['Tradicional', 'Com leite'],
    category: 'with-milk',
  },
  {
    id: 'macchiato',
    name: 'Macchiato',
    description: 'Café expresso misturado com um pouco de leite quente e espuma',
    priceInCents: 1190,
    image: macchiato,
    tags: ['Tradicional', 'Com leite'],
    category: 'with-milk',
  },
  {
    id: 'mocaccino',
    name: 'Mocaccino',
    description: 'Café expresso com calda de chocolate, pouco leite e espuma',
    priceInCents: 1390,
    image: mocaccino,
    tags: ['Tradicional', 'Com leite'],
    category: 'with-milk',
  },
  {
    id: 'chocolate-quente',
    name: 'Chocolate Quente',
    description: 'Bebida feita com chocolate dissolvido no leite quente e café',
    priceInCents: 1390,
    image: chocolateQuente,
    tags: ['Especial', 'Com leite'],
    category: 'special',
  },
  {
    id: 'cubano',
    name: 'Cubano',
    description: 'Drink gelado de café expresso com rum, creme de leite e hortelã',
    priceInCents: 1590,
    image: cubano,
    tags: ['Especial', 'Alcoólico', 'Gelado'],
    category: 'alcoholic',
  },
  {
    id: 'havaiano',
    name: 'Havaiano',
    description: 'Bebida adocicada preparada com café e leite de coco',
    priceInCents: 1490,
    image: havaiano,
    tags: ['Especial'],
    category: 'special',
  },
  {
    id: 'arabe',
    name: 'Árabe',
    description: 'Bebida preparada com grãos de café árabe e especiarias',
    priceInCents: 1490,
    image: arabe,
    tags: ['Especial'],
    category: 'special',
  },
  {
    id: 'irlandes',
    name: 'Irlandês',
    description: 'Bebida a base de café, uísque irlandês, açúcar e chantilly',
    priceInCents: 1690,
    image: irlandes,
    tags: ['Especial', 'Alcoólico'],
    category: 'alcoholic',
  },
]

const coffeesById: ReadonlyMap<string, Coffee> = new Map(coffees.map((coffee) => [coffee.id, coffee]))

export function findCoffeeById(id: string): Coffee | undefined {
  return coffeesById.get(id)
}
