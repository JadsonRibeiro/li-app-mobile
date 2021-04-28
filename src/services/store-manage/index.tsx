import axios, { AxiosInstance, AxiosResponse } from 'axios';

interface Image {
    caminho: string;
    grande: string;
    icone: string;
    id: string;
    id_anymarket?: string;
    imagem_id: string;
    media: string;
    mime: string;
    pequena: string;
    posicao?: string;
    principal: boolean;
    produto: string;
    resource_uri: string;
}

interface BaseProduct {
    apelido: string;
    ativo: boolean;
    bloqueado: boolean;
    categorias: string[],
    descricao_completa: string;
    filhos: string[];
    grades: string[];
    gtin?: string;
    id: string;
    id_externo?: string;
    mpn?: string;
    ncm?: string;
    nome: string;
    removido: boolean;
    resource_uri: string;
    seo: string;
    sku: string;
    tipo: "atributo" | "atributo_opcao";
    url: string;
    url_video_youtube?: string;
    variacoes?: string[];
}

interface CompleteProduct extends BaseProduct {
    altura?: number;
    data_criacao: string;
    data_modificacao: string;
    destaque: boolean;
    imagem_pricipal?: string;
    imagens: Image[],
    largura?: number;
    marca: string;
    pai?: string;
    peso?: number;
    profundidade?: number;
    usado: boolean;
    childrens?: Variant[];
}

interface Variant {
    altura: number;
    apelido: string;
    ativo: boolean;
    bloqueado: boolean;
    categorias: string[];
    data_criacao: string;
    data_modificacao: string;
    descricao_completa: string;
    destaque: boolean;
    gtin: string;
    id: string;
    id_externo: string;
    imagem_principal: string;
    imagens: Image[];
    largura: number;
    marca: string;
    mpn: string;
    ncm: string;
    nome: string;
    pai: string;
    peso: number;
    profundidade: number;
    removido: boolean;
    resource_uri: string;
    seo: string;
    sku: string;
    tipo: 'atributo_opcao' | 'atributo';
    url: string;
    url_video_youtube: string;
    usado: boolean;
    variacoes: string[];
}

interface StockData {
    gerenciado: boolean;
    id: string;
    produto: string;
    quantidade: number;
    quantidade_disponivel: number;
    quantidade_reservada: number;
    resource_uri: string;
    situacao_em_estoque: number;
    situacao_sem_estoque: number;
}

export interface Price {
    cheio: string,
    custo: string,
    id?: string,
    produto?: string,
    promocional: string,
    resource_uri?: string,
}

interface Category {
    categoria_pai: string;
    descricao: string;
    id: string;
    id_externo: string;
    nome: string;
    resource_uri: string;
    seo: string;
    url: string;
}

interface Brand {
    apelido: string;
    ativo: boolean;
    descricao: string;
    id: string;
    id_externo: string;
    imagem: string;
    nome: string;
    resource_uri: string;
}

interface Grade {
    id: number;
    id_externo: number;
    nome: string;
    nome_visivel: string;
    resource_uri: string;
    variacoes?: Variation[]
}

interface Variation {
    grade: string,
    id: number,
    id_externo: number,
    nome: string,
    resource_uri: string,
}

class Store {
    api: AxiosInstance;
    
    constructor(apiKey: string, apiApp: string) {
        this.api = axios.create({
            baseURL: 'https://api.awsli.com.br/',
            headers: {
                'Authorization': `chave_api ${apiKey} aplicacao ${apiApp}`,
                'Content-Type': 'application/json'
            },
            timeout: 2000
        });

        // this.api.defaults.headers.common['Authorization'] = `chave_api ${apiKey} aplicacao ${apiApp}`;
    }


    showAPIResources() {
        this.api.get('', { params: { format: 'json' } }).then(res => {
            console.log('Res', res);
        })
    }

    async getProductByID(id: string): Promise<CompleteProduct> {
        // Get complete product data
        const res = await this.api.get(`/v1/produto/${id}`);
        const completeProduct = res.data as CompleteProduct;

        return completeProduct;
    }

    async getSimpleProductDataBySKU(sku: string): Promise<BaseProduct> {
        // Get simple product data
        const { data } = await this.api.get('/v1/produto', { params: { sku } });
        const objects = data.objects ? data.objects as BaseProduct[] : [];
        const product = objects[0];
        
        return product;
    }

    async getCompleteProductDataBySKU(sku: string, getChildrensData = false): Promise<CompleteProduct> {
        // Get simple product data
        const product = await this.getSimpleProductDataBySKU(sku);

        // Get complete product data
        const completeProduct = await this.getProductByID(product.id);

        if(getChildrensData) {
            // Get children data
            completeProduct.childrens = [];
            for (const childrenPath of completeProduct.filhos) {
                const { data } = await this.api.get<Variant>(childrenPath);
                completeProduct.childrens.push(data);
            }
        }

        return completeProduct;
    }

    async createProduct(productData: any) {
        /* 
            ESSA IMPLEMENTACAO SE MOSTROU INVIÁVEL POR CAUSA DOS CAMPOS GRADE E VARIACOES
            - GRADE: PARA CADASTRAR CADA PRODUTO PAI É NECESSÁRIO INFORMAR AS GRADES DE SEUS FILHOS (tamanho-de-calca, produto-com-uma-cor, ...)
                PARA ISSO, SERIA NECESSÁRIA PERCORRER PELO MENOS O PRIMEIRO FILHO E VER QUAIS VARIACOES ELE POSSUI (ONDE TEM VALOR) E 
                ENCONTRAR AS RESOURCES_URI DESSAS VARIACOES O QUE É MUITO DIFICIL POIS A API NÃO FORNECE UM FILTRO PARA CONSULTAR AS GRADES OU 
                VARIACOES POR SEUS VALORES, OU SEJA, ERA NECESSÁRIO CARREGAR TODAS GRADES/VARIACOES E DA UM array.filter
            - VARIACOES: O MESMO ACIMA SE APLICA AS VARIACOES DE CADA FILHO
            VISTO QUE, IMPORTAR PELA PLANILHA É RELATIVAMENTE FACIL E HÁ UM FORMA FÁCIL DE GERAR ESSA PLANILHA, NÃO FAZ SENTIDO DESPENDER TODO 
            ESFORÇO ACIMA PARA CRIAR PRODUTOS DESSA FORMA. ALÉM DISSO, AINDA HÁ O IMPECILHO NO LIMITE DE REQUISIÇÕES BAIXO DA API.
        */

        // switch (productData.tipo) {
        //     case 'atributo':
        //         YupSchemas.productFatherSchema.validate(productData);
        //         break;
        //     case 'atributo_opcao':
        //         YupSchemas.productChildrenSchema.validate(productData);
        //         break;
        //     default:
        //         throw new Error('Product Type is invalid');
        // }
        
        // return this.api.post('/api/v1/produto', productData, { headers: { 'Content-Type': 'application/json' } });
    }

    // TODO: Complete method
    async updateProductBySKU(sku: string): Promise<void> {
        // Get product data
        const productData = await this.getCompleteProductDataBySKU(sku);

        productData.categorias.unshift('/api/v1/categoria/3962123');

        this.api.put(`/v1/produto/${productData.id}/`, productData, { headers: { 'Content-Type': 'application/json' } })
            .then(response => {
                console.log('Res', response);
            }).catch(e => {
                console.error('Error', e);
            });
    }

    // Doc: https://lojaintegrada.docs.apiary.io/#reference/estoque/detalhes-do-estoque
    async getStockByID(id: string): Promise<StockData> {
        const res = await this.api.get(`/v1/produto_estoque/${id}`);

        const data = res.data as StockData;

        return data;
    }

    async getStockBySKU(sku: string): Promise<StockData> {
        const productData = await this.getSimpleProductDataBySKU(sku);

        return await this.getStockByID(productData.id);
    }

    // Doc: https://lojaintegrada.docs.apiary.io/#reference/estoque/detalhes-do-estoque
    async updateStockByID(
        id: string, 
        newQUantity: number, 
        additionalData: {
            situacao_em_estoque?: number;
            situacao_sem_estoque?: number;
        } = {}): Promise<AxiosResponse> {
        
        // Get stoque data
        const stockData = await this.getStockByID(id);

        stockData.quantidade = newQUantity;
        stockData.quantidade_disponivel = newQUantity;

        if(additionalData.situacao_em_estoque)
            stockData.situacao_em_estoque = additionalData.situacao_em_estoque;
        
        if(additionalData.situacao_sem_estoque)
            stockData.situacao_sem_estoque = additionalData.situacao_sem_estoque;

        return this.api.put(`/v1/produto_estoque/${id}`, stockData);
    }

    async updateStockBySKU(
        sku: string, 
        newQUantity: number, 
        additionalData: {
            situacao_em_estoque?: number;
            situacao_sem_estoque?: number;
        } = {}): Promise<AxiosResponse> {

        const product = await this.getSimpleProductDataBySKU(sku);

        return this.updateStockByID(product.id, newQUantity, additionalData);
    }

    async getPriceByID(id: string): Promise<Price> {
        const res = await this.api.get(`/v1/produto_preco/${id}`);
        const data = res.data as Price;

        return data;
    }

    async getPriceBySKU(sku: string): Promise<Price> {
        const product = await this.getSimpleProductDataBySKU(sku);

        return await this.getPriceByID(product.id);
    }

    async getAllChildrensPriceByParentSKU(parentSKU: string): Promise<Price[]> {
        const product = await this.getSimpleProductDataBySKU(parentSKU);

        const childrensPrices = [];
        for (const filhoUri of product.filhos) {
            const childrenId = filhoUri.split('/').pop();

            if(childrenId) {
                var childrenPrice = await this.getPriceByID(childrenId)
                childrensPrices.push(childrenPrice)
            }   
        }
        return childrensPrices;
    }

    async updatePriceByID(id: string, price: Price): Promise<AxiosResponse> {
        return this.api.put(`/v1/produto_preco/${id}`, price);
    }

    async updatePriceBySKU(sku: string, newPrice: Price): Promise<AxiosResponse>  {
        const product = await this.getSimpleProductDataBySKU(sku);

        return this.updatePriceByID(product.id, newPrice);
    }

    async updateAllChildrensPriceByParentSKU(parentSKU: string, newPrice: Price): Promise<void> {
        const product = await this.getSimpleProductDataBySKU(parentSKU);

        product.filhos.forEach((filhoUri: string) => {
            const childrenId = filhoUri.split('/').pop();

            if(childrenId)
                this.updatePriceByID(childrenId, newPrice);
        });
    }

    async applyDiscount(sku: string, percentageDiscount: number) {
        const product = await this.getSimpleProductDataBySKU(sku);
        
        const firstChildrenURI = product.filhos[0];
        const childrenID = firstChildrenURI.split('/').pop();

        if(!childrenID)
            return;

        const childrenPrice = await this.getPriceByID(childrenID);

        childrenPrice.cheio = Number(childrenPrice.cheio).toFixed(2);

        var newPromotionalPrice = (((100 - percentageDiscount) / 100) * Number(childrenPrice.cheio)).toFixed(2);
           
        if(percentageDiscount === 0) {
            newPromotionalPrice = '0.00';
        }

        var newPrice = {
            cheio: childrenPrice.cheio,
            custo: childrenPrice.custo,
            promocional: newPromotionalPrice
        };

        this.updateAllChildrensPriceByParentSKU(sku, newPrice);
    }

    async getAllCategories(): Promise<Category[]> {
        const { data } = await this.api.get('/api/v1/categoria');
        const objects = data.objects as Category[];
        return objects;
    }

    async getCategoryByID(categoryID: string): Promise<Category> {
        const res = await this.api.get(`/api/v1/categoria/${categoryID}`);
        const data = res.data as Category;
        return data;
    }

    async addCategoryToProduct(sku: string, categoryID: string): Promise<AxiosResponse> {
        const productData = await this.getCompleteProductDataBySKU(sku);
        
        // Dont use getCategoryByID to avoid Throttling
        const categoryResourceURI = `/api/v1/categoria/${categoryID}`;

        // Verifies if category already exists
        if(productData.categorias.includes(categoryResourceURI)) {
            throw new Error('Categoria já cadastrada');
        }
        
        productData.categorias.unshift(categoryResourceURI);

        return this.api.put(`/v1/produto/${productData.id}/`, productData)
    }

    async removeCategoryFromProduct(sku: string, categoryID: string): Promise<AxiosResponse> {
        const productData = await this.getCompleteProductDataBySKU(sku);

        // Dont use getCategoryByID to avoid Throttling
        const categoryResourceURI = `/api/v1/categoria/${categoryID}`;

        // Verifies if category already exists
        if(!productData.categorias.includes(categoryResourceURI)) {
            throw new Error('Categoria não existe nesse produto');
        }

        productData.categorias = productData.categorias.filter((category: string) => category !== categoryResourceURI);
        
        return this.api.put(`/v1/produto/${productData.id}/`, productData, { headers: { 'Content-Type': 'application/json' } })
    }

    async getAllBrands(): Promise<Brand[]> {
        const { data } = await this.api.get('/api/v1/marca');
        const brands = data.objects as Brand[];
        return brands;
    }

    async getBrandByNickname(nickname: string): Promise<Brand | undefined> {
        const brands = await this.getAllBrands();
        
        const brand = brands.find((brand: Brand) => brand.apelido === nickname);

        return brand;
    }

    async getAllGrades(): Promise<Grade[]> {
        const { data } = await this.api.get('/api/v1/grades');
        const grades = data.objects as Grade[];
        return grades;
    }

    async getGradeByID(gradeID: string): Promise<Grade> {
        const res = await this.api.get(`/api/v1/grades/${gradeID}`);
        const grade = res.data as Grade;
        return grade;
    }

    async getVariations(gradeID: string): Promise<Variation[]> {
        const { data } = await this.api.get(`/api/v1/grade/${gradeID}/variacao`);
        const variations = data.objects as Variation[];
        return variations;
    }

    async getVariation(gradeID: string, variationID: string): Promise<Variation> {
        const res = await this.api.get(`/api/v1/grade/${gradeID}/variacao/${variationID}`);
        const variation = res.data as Variation;
        return variation;
    }
}

export default Store;