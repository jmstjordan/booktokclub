import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SocialMediaIconsComponent } from './social-media-icons/social-media-icons.component';
import { NewsletterFormComponent } from './newsletter-form/newsletter-form.component';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, SocialMediaIconsComponent, NewsletterFormComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

}
