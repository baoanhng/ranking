import "./Category.scss"

function Category({ title, description }) {
    return (
        <div className="category">
            <h1>{title}</h1>
            <p>{description}</p>
        </div>
    );
}

export default Category;