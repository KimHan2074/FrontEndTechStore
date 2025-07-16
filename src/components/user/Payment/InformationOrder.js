import { useState, useEffect } from "react";
import "../../../pages/user/Payment/Payment.css";
import LoadingSpinner from "../../../components/common/LoadingSpinner";
import { data } from "react-router-dom";

const InformationOrder = ({ onContinue, setCurrentStep, currentStep }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    province: "",
    provinceName: "",
    district: "",
    districtName: "",
    ward: "",
    wardName: "",
  });

  const [products, setProducts] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);
  const [total, setTotal] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [locationData, setLocationData] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [order, setOrder] = useState(null);
  const orderId = localStorage.getItem("currentOrderId");
  const token = localStorage.getItem("token");
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("checkoutData"));
    console.log("data", data);
    if (data) {
      setProducts(data.items || []);
      setSubtotal(data.subtotal || 0);
      setDiscount(data.discount || 0);
      setShippingFee(data.shippingCost || 0);
      setTotal(data.total || 0);
    }
  }, []);
  useEffect(() => {
    if (!products || products.length === 0) return;

    const subtotalCalc = products.reduce((sum, item) => {
      const price = Number(item.unit_price) || 0;
      const qty = Number(item.quantity) || 0;
      return sum + price * qty;
    }, 0);

    setSubtotal(subtotalCalc);
    setTotal(subtotalCalc + shippingFee - discount);
  }, [products, shippingFee, discount]);

  useEffect(() => {
    const fetchOrder = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`https://backendlaraveltechstore-production.up.railway.app/api/user/orders/${orderId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setOrder(data.order);
          setProducts(data.order.order_details);
          setShippingFee(data.order.shipping_fee || 0);  
          setDiscount(data.order.discount || 0);         
          setTotal(Number(data.order.total_amount) || 0);
        } else {
          alert("Failed to load order data.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error loading order details.");
      } finally {
        setIsLoading(false);
      }
    };
    if (orderId && token) {
      fetchOrder();
    }
  }, [orderId, token]);

  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/?depth=3")
      .then((res) => res.json())
      .then((data) => setLocationData(data))
      .catch((err) => console.error("Error fetching location:", err));
  }, []);

  const handleProvinceChange = (e) => {
    const selectedProvince = locationData.find((p) => String(p.code) === e.target.value);
    if (selectedProvince) {
      setFormData((prev) => ({
        ...prev,
        province: String(selectedProvince.code),
        provinceName: selectedProvince.name,
        district: "",
        districtName: "",
        ward: "",
        wardName: "",
      }));
      setDistricts(selectedProvince.districts);
      setWards([]);
    }
  };

  const handleDistrictChange = (e) => {
    const selectedDistrict = districts.find((d) => String(d.code) === e.target.value);
    if (selectedDistrict) {
      setFormData((prev) => ({
        ...prev,
        district: String(selectedDistrict.code),
        districtName: selectedDistrict.codename,
        ward: "",
        wardName: "",
      }));
      setWards(selectedDistrict.wards || []);
    }
  };

  const handleWardChange = (e) => {
    const selectedWard = wards.find((w) => String(w.code) === e.target.value);
    if (selectedWard) {
      setFormData((prev) => ({
        ...prev,
        ward: String(selectedWard.code),
        wardName: selectedWard.name,
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContinue = async () => {
    const orderId = localStorage.getItem("currentOrderId");
    if (!orderId) {
      alert("Order has not been created or ID not found");
      return;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      alert("Invalid phone number. Please enter exactly 10 digits.");
      return;
    }

    const payload = {
      full_name: formData.fullName,
      phone: formData.phone,
      address: formData.address,
      province: formData.provinceName,
      district: formData.districtName,
      ward: formData.wardName,
    };

    try {
      const response = await fetch(
        `https://backendlaraveltechstore-production.up.railway.app/api/user/orders/${orderId}/update-info`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert("Recipient information updated successfully!");
        if (typeof onContinue === "function") onContinue();
      } else {
        alert("Update failed: " + result.message);
      }
    } catch (error) {
      console.error("Error while submitting information:", error);
      alert("An error occurred while submitting the information.");
    }
  };
  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="payment-container-information-order">
      <h1 className="payment-title-information-order">Payment</h1>
      <div className="payment-content-information-order">
        <div className="left-section-information-order">
          <div className="form-section-information-order">
            <div className="section-header-information-order">
              <div className="step-number-information-order active">1</div>
              <h2>Order Information</h2>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleContinue();
              }}
            >
              <div className="form-content-information-order">
                <div className="form-row-information-order">
                  <div className="form-group-information-order">
                    <label>Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name..."
                      required
                    />
                  </div>
                  <div className="form-group-information-order">
                    <label>Phone</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number..."
                      required
                    />
                  </div>
                </div>

                <div className="form-group-information-order">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter your address..."
                    required
                  />
                </div>

                <div className="form-row-information-order">
                  <div className="form-group-information-order">
                    <label>Province/City</label>
                    <select
                      value={formData.province}
                      onChange={handleProvinceChange}
                      required
                    >
                      <option value="">-- Select Province --</option>
                      {locationData.map((p) => (
                        <option key={p.code} value={String(p.code)}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group-information-order">
                    <label>District</label>
                    <select
                      value={formData.district}
                      onChange={handleDistrictChange}
                      disabled={!formData.province}
                      required
                    >
                      <option value="">-- Select District --</option>
                      {districts.map((d) => (
                        <option key={d.code} value={String(d.code)}>
                          {d.codename}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group-information-order">
                    <label>Ward/Commune</label>
                    <select
                      value={formData.ward}
                      onChange={handleWardChange}
                      disabled={!formData.district}
                      required
                    >
                      <option value="">-- Select Ward --</option>
                      {wards.map((w) => (
                        <option key={w.code} value={String(w.code)}>
                          {w.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button type="submit" className="continue-btn-information-order">
                  Continue
                </button>
              </div>
            </form>
          </div>

          <div className="form-section-information-order">
            <div
              className="section-header-information-order"
              onClick={() => setCurrentStep(2)}
            >
              <div className="step-number-information-order clickable">2</div>
              <h2>Payment Method</h2>
            </div>
          </div>

          <div className="form-section-information-order">
            <div
              className="section-header-information-order"
              onClick={() => setCurrentStep(3)}
            >
              <div className="step-number-information-order clickable">3</div>
              <h2>Order Confirmation</h2>
            </div>
          </div>
        </div>

        <div className="right-section-information-order">
          <div className="product-section-information-order">
            <h3>Products</h3>
            <div className="product-list-information-order">
              {products.map((product, index) => (
                <div key={`${product.id || product.cart_item_id}-${index}`} className="product-item-information-order">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="product-image-information-order"
                  />
                  <div className="product-details-information-order">
                    <h4>{product.name}</h4>
                    <p className="quantity-information-order">Quantity: {product.quantity}</p>
                    <div className="price-container-information-order">
                      <span className="current-price-information-order">
                        ${(product.unit_price * product.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="order-summary-information-order">
            <h3>Order Summary</h3>
            <div className="summary-row-information-order">
              <span>Subtotal</span>
              <span className="price-blue-information-order">${subtotal.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="summary-row-information-order">
                <span>Discount</span>
                <span className="price-blue-information-order">-${discount.toFixed(2)}</span>
              </div>
            )}
            <div className="summary-row-information-order">
              <span>Shipping Fee</span>
              <span className="price-blue-information-order">${shippingFee.toFixed(2)}</span>
            </div>
            <div className="summary-row-information-order total">
              <span>Total</span>
              <span className="price-blue-information-order">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformationOrder;
