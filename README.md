# Expo Bare Features

## O objetivo deste template é ajudar os devs à utilizar algumas funcionalidades comuns no desenvolvimento de aplicativos com React Native / Expo. Nele vamos utilizar:

- Expo Bare Workflow
- TypeScript
- React Navigation
- Native Base
- React Query
- Async Storage
- Variáveis de Ambiente (.env)

### Expo Bare Workflow

Atualmente vejo o Expo Bare Workflow como a melhor forma de criar projetos em React Native, pois conseguimos ter acesso às funcionalidades nativas do dispositivo e ter a facilidade que o expo proporciona.

Tutorial para instalar o expo: [https://docs.expo.dev/get-started/installation/](https://docs.expo.dev/get-started/installation/)

Com o expo já instalado, basta rodar o comando abaixo:

> npx create-expo-app --template

em seguida

> Escolha a opção "Blank Bare"

> Digite o nome do projeto

Como o Bare Workflow não vem com o TypeScript automaticamente, precisamos instalar ele.

### TypeScript

Para iniciar a configuração do TypeScript no nosso projeto, primeiro rodaremos o seguinte comando para criar o arquivo de configuração:

> touch tsconfig.json

Em seguida podemos inicializar o projeto, ele irá instalar automaticamente as dependencias necessárias do TypeScript (Basta apertar **y** quando aparecer a mensagem):

> npx expo start

Caso não seja instalado automaticamente, basta rodar:

> npx expo install typescript @types/react @types/react-native -D

Altere o arquivo:

> App.js -> App.tsx

Para finalizar, rode o comando abaixo para preencher o arquivo **tsconfig.json** com as informações necessárias:

> npx tsc
> ou
> yarn tsc

Agora seu projeto está pronto para utilizar o Typescript! Caso queira ver a documentação completa, acesse: [https://docs.expo.dev/guides/typescript/](https://docs.expo.dev/guides/typescript/)

### React Navigation

Uma das funcionalidades mais comuns e mais importantes é a navegação entre telas, por isso vamos utilizar o React Navigation. Para iniciar, vamos instalar as seguintes dependências:

> npm install @react-navigation/native
> ou
> yarn add @react-navigation/native

> npx expo install react-native-screens react-native-safe-area-context

Agora vamos colocar o Container por volta de toda a aplicação, ele pode ser colocado no index.js ou no App.tsx (eu prefiro colocar no App.tsx):

```tsx
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer>{/* Rest of your app code */}</NavigationContainer>
  );
}
```

Após isso, vamos configurar o tipo de navegação que vamos utilizar, existem vários tipos (Stack, Drawer, Tabs, etc), vamos utilizar o Stack Navigation.

Instale a dependência:

> npm install @react-navigation/native-stack
> ou
> yarn add @react-navigation/native-stack

Antes de configurar a navegação, vamos organizar nosso projeto.

1. Na raiz do projeto, crie uma pasta **src**, onde vai ficar o conteúdo do nosso projeto.

2. Dentro de **src**, crie uma pasta **routes**, e dentro dela crie o arquivo **index.routes.tsx**. Nele vamos colocar o seguinte código:

```tsx
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PageExample1 } from "../pages/PageExample1";
import { PageExample2 } from "../pages/PageExample2";

const Stack = createNativeStackNavigator();

export function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PageExample1" component={PageExample1} />
      <Stack.Screen name="PageExample2" component={PageExample2} />
    </Stack.Navigator>
  );
}
```

A estrutura de pastas vai ficar assim:

![Página de rotas](src/assets/documentation/routes-folder.jpg)

Como estamos utilizando o TypeScript, é necessário fazer mais algumas configurações para não ocorrer erro de tipagem. Quando formos criar uma nova tela, precisamos informar quais vão ser a propriedades daquela tela/rota.

Primeiro vamos criar uma pasta **@types**, e dentro dela o arquivo **navigation.d.ts** com o seguinte conteúdo.

```ts
export type PageExample2Params = {
  id: string;
  name: string;
  description: string;
};

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      pageExample1: undefined;
      pageExample2: GameParams;
    }
  }
}

```

Nesse arquivo, as propriedades padrão do ReactNavigation vão ser sobrescritas, fazendo com que ele entenda as nossas rotas. Nesse exemplo temos duas rotas, a **pageExample1** e **pageExample2** (Precisam ter os mesmos nomes no arquivos index.routes.ts), a primeira rota não recebe parâmetros, já a segunda recebe os parâmetros declarados no início do arquivo.

Pronto! Agora podemos mudar de tela sem problemas.

Documentação completa: [https://reactnavigation.org/docs/hello-react-navigation](https://reactnavigation.org/docs/hello-react-navigation)


### Native Base

Para construir a interface e componentes de forma mais produtiva, vamos utilizar o [Native Base](https://docs.nativebase.io/install-expo)

Vamos iniciar instalando as bibliotecas necessárias:

> yarn add native-base
> ou
> npm install native-base

> expo install react-native-svg


Esse próximo já foi instalado, mas caso seja necessário instale novamente:
> expo install react-native-safe-area-context

Com ele instalado, vamos adicionar o Provider por volta de toda a aplicação, assim como fizemos com o React Navigation:

No App.tsx:
```tsx
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";

export default function App() {
  return (
    <NativeBaseProvider>
        <NavigationContainer>
            {/* Rest of your app code */}
        </NavigationContainer>
    </NativeBaseProvider>
  );
}
```

Agora só usar os componentes disponíveis para ajudar na construção do layout!

Documentação completa: [https://docs.nativebase.io/install-expo](https://docs.nativebase.io/install-expo)

### React Query

O React Query é um biblioteca que melhora a performance e a produtividade quando fazemos requisições à APIs.

Instalação:

> npm i @tanstack/react-query ou yarn add @tanstack/react-query


Podemos fazer toda a configuração no App.tsx, mas vamos organizar melhor isso.

1. Crie uma pasta **services** dentro do **src**