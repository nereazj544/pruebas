import { Component, OnInit } from '@angular/core';
import { ReleasesService } from '../../service/releases.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-novedades',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './novedades.component.html',
  styleUrl: './novedades.component.css'
})
export class NovedadesComponent implements OnInit {
  filters = ['Libros', 'Películas', 'Series', 'Videojuegos'];
  platforms = ['PLAYSTATION', 'XBOX', 'SWITCH', 'PC'];
  currentFilter = 'Libros';
  selectedPlatform = '';
  currentReleases: any[] = []; // Mejor definir una interface Release
  
  constructor(private releasesService: ReleasesService) {}

  ngOnInit() {
    this.updateReleases();
  }

  async setFilter(filter: string) {
    this.currentFilter = filter;
    this.selectedPlatform = '';
    await this.updateReleases();
  }

  async setPlatform(platform: string) {
    this.selectedPlatform = platform;
    await this.updateReleases();
  }

  private async updateReleases() {
    try {
      this.currentReleases = await this.releasesService.getReleases(
        this.currentFilter,
        this.selectedPlatform
      );
    } catch (error) {
      console.error('Error updating releases:', error);
      // Manejar el error apropiadamente
    }
  }

  async onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    const query = input.value;
    
    try {
      if (query.trim()) {
        this.currentReleases = await this.releasesService.searchReleases(query);
      } else {
        await this.updateReleases();
      }
    } catch (error) {
      console.error('Error searching releases:', error);
      // Manejar el error apropiadamente
    }
  }
}