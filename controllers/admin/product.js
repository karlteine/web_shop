const Product = require('../../models/product')

class adminController {

    async addProduct(req, res) {
        const product = await Product.create({
            title: req.body.title,
            price: req.body.price,
            imageUrl: req.body.imageUrl,
            description: req.body.description,
            userId: req.user.id
        })
        res.status(201).json({
            message: 'Product is added',
            productId: product.id
        })
    }
    async getAllProducts(req, res) {
        try {
            const products = await Product.findAll();
            res.status(200).json({ products });
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }
    async getProductById(req, res) {
        try {
            const productId = req.params.id; 
            const product = await Product.findByPk(productId);
            
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
    
            res.status(200).json(product);
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }
    async getProductForEdit(req, res) {
        try {
            const productId = req.params.id;
            const product = await Product.findByPk(productId);
    
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
    
            res.status(200).json(product);
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }
    
    async updateProduct(req, res) {
        try {
            const productId = req.params.id;
            const { title, price, imageUrl, description } = req.body;
    
            const [updated] = await Product.update(
                { title, price, imageUrl, description },
                { where: { id: productId } }
            );
    
            if (updated) {
                return res.status(200).json({ message: 'Product updated successfully' });
            }
    
            res.status(404).json({ message: 'Product not found' });
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    } 
    async deleteProduct(req, res) {
        try {
            const productId = req.params.id;
            const deleted = await Product.destroy({ where: { id: productId } });
    
            if (deleted) {
                return res.status(200).json({ message: 'Product deleted successfully' });
            }
    
            res.status(404).json({ message: 'Product not found' });
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }
    
    
}

module.exports = new adminController()