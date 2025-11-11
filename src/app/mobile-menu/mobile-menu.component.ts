import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  emoji: string;
  category: string;
  points: number;
}

interface CartItem extends MenuItem {
  quantity: number;
}

@Component({
  selector: 'app-mobile-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mobile-menu.component.html',
  styleUrl: './mobile-menu.component.css'
})
export class MobileMenuComponent {
  currentStep: 'menu' | 'cart' | 'payment' | 'success' = 'menu';
  cart: CartItem[] = [];
  totalPoints: number = 0;
  selectedPaymentMethod: 'card' | 'cash' | null = null;
  showPointsAnimation: boolean = false;

  menuItems: MenuItem[] = [
    {
      id: 1,
      name: 'Café Latte',
      description: 'Expresso onctueux avec lait chaud',
      price: 4.50,
      emoji: '☕',
      category: 'Boissons chaudes',
      points: 45
    },
    {
      id: 2,
      name: 'Croissant',
      description: 'Croissant au beurre frais',
      price: 2.00,
      emoji: '🥐',
      category: 'Viennoiseries',
      points: 20
    },
    {
      id: 3,
      name: 'Burger Classique',
      description: 'Pain maison, steak, cheddar, salade',
      price: 12.00,
      emoji: '🍔',
      category: 'Plats',
      points: 120
    },
    {
      id: 4,
      name: 'Salade César',
      description: 'Poulet grillé, parmesan, croutons',
      price: 10.50,
      emoji: '🥗',
      category: 'Plats',
      points: 105
    },
    {
      id: 5,
      name: 'Jus d\'Orange Frais',
      description: 'Pressé minute',
      price: 4.00,
      emoji: '🍊',
      category: 'Boissons froides',
      points: 40
    },
    {
      id: 6,
      name: 'Tiramisu',
      description: 'Recette traditionnelle italienne',
      price: 6.00,
      emoji: '🍰',
      category: 'Desserts',
      points: 60
    }
  ];

  get cartTotal(): number {
    return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  get cartItemsCount(): number {
    return this.cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  get earnedPoints(): number {
    return this.cart.reduce((sum, item) => sum + (item.points * item.quantity), 0);
  }

  getCategories(): string[] {
    return [...new Set(this.menuItems.map(item => item.category))];
  }

  getItemsByCategory(category: string): MenuItem[] {
    return this.menuItems.filter(item => item.category === category);
  }

  addToCart(item: MenuItem): void {
    const existingItem = this.cart.find(cartItem => cartItem.id === item.id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cart.push({ ...item, quantity: 1 });
    }

    // Animation effect
    this.triggerAddAnimation();
  }

  removeFromCart(itemId: number): void {
    const itemIndex = this.cart.findIndex(item => item.id === itemId);
    if (itemIndex > -1) {
      if (this.cart[itemIndex].quantity > 1) {
        this.cart[itemIndex].quantity--;
      } else {
        this.cart.splice(itemIndex, 1);
      }
    }
  }

  deleteFromCart(itemId: number): void {
    this.cart = this.cart.filter(item => item.id !== itemId);
  }

  goToCart(): void {
    if (this.cart.length > 0) {
      this.currentStep = 'cart';
    }
  }

  goToPayment(): void {
    this.currentStep = 'payment';
  }

  backToMenu(): void {
    this.currentStep = 'menu';
  }

  backToCart(): void {
    this.currentStep = 'cart';
  }

  selectPaymentMethod(method: 'card' | 'cash'): void {
    this.selectedPaymentMethod = method;
  }

  confirmPayment(): void {
    if (this.selectedPaymentMethod) {
      this.totalPoints += this.earnedPoints;
      this.currentStep = 'success';
      this.showPointsAnimation = true;

      setTimeout(() => {
        this.showPointsAnimation = false;
      }, 2000);
    }
  }

  resetDemo(): void {
    this.cart = [];
    this.selectedPaymentMethod = null;
    this.currentStep = 'menu';
  }

  private triggerAddAnimation(): void {
    // Cette fonction pourrait déclencher une animation CSS
    const cartButton = document.querySelector('.cart-button');
    if (cartButton) {
      cartButton.classList.add('bounce');
      setTimeout(() => {
        cartButton.classList.remove('bounce');
      }, 300);
    }
  }
}
