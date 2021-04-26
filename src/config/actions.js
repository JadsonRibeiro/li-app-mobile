export default [
    {   
        label: 'Estoque',
        key: 'stock',
        options: [
            { label: 'Alterar estoque de produto', screen: 'UpdateStockProduct' },
            { label: 'Alterar estoque de variante', screen: 'UpdateStockVariant' }
        ]
    },
    {
        label: 'Categoria',
        key: 'category',
        options: [
            { label: 'Adicionar a um produto', screen: 'AddCategoryToProduct' },
            { label: 'Remover de um produto', screen: 'RemoveCategoryToProduct' }
        ]
    },
    {
        label: 'Preço',
        key: 'price',
        options: [
            { label: 'Alterar preço de produto', screen: 'AlterProductPrice' },
            { label: 'Aplicar promoção', screen: 'ApplyDiscountOnProduct' }
        ]
    },
]