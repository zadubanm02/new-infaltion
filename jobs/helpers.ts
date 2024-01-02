/**
 * @description Function that finds product name and returns it
 * @param {Element} node - Container element
 * @returns {string} productName - Name of the product
 * */
export const getProductName = (node: Element): string => {
  return node.querySelector(".product__name")?.textContent ?? "";
};

/**
 * @description Function that finds original price and returns it
 * @param {Element} node - Container element
 * @returns {number} originalPrice - Original price of product
 * */
export const getOriginalPrice = (node: Element): string => {
  return (
    node
      .querySelector(".product__discount-normal-price")
      ?.textContent?.trim() ?? ""
  );
};

/**
 * @description Function that finds discounted price a returns it
 * @param {Element} node - Container element
 * @returns {number} discountedPrice - Discounted price of product
 * */
export const getDiscountedPrice = (node: Element): string => {
  return node.querySelector(".price__left-part")?.textContent?.trim() ?? "";
};

/**
 * @description Function that finds discount value a returns it
 * @param {Element} node - Container element
 * @returns {number} discount - Discount value of product
 * */
export const getDiscountValue = (node: Element): string => {
  return (
    node
      .querySelector(".discount-percentage__text")
      ?.textContent?.trim()
      .substring(0, 3) ?? ""
  );
};

/**
 * @description Function that finds image url a returns it
 * @param {Element} node - Container element
 * @returns {string} imageUrl - Image url of the product
 * */
export const getImageUrl = (node: Element): string => {
  // get container
  const wrapper = node.querySelector(".product__info-wrapper");
  return "hello";
};

// /**
//  * @description Function that creates
//  * @param {Element} container - Container element
//  * @returns {string} imageUrl - Image url of the product
//  * */
//  const createDbObject = (container: Element): string => {
//   // get container
//   const wrapper = container.querySelector(".product__info-wrapper");
//   return "hello";
// };
