import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

interface Release {
    id: number;
    title: string;
    releaseDate: Date;
    type: string;
    platform?: string;
    imageUrl: string;
    description: string;
    authors?: string[];
}

@Injectable({
    providedIn: 'root'
})
export class ReleasesService {
    private readonly GOOGLE_BOOKS_API = 'https://www.googleapis.com/books/v1/volumes';
    private releases: Release[] = [
        {
            id: 2,
            title: "Final Fantasy VII Rebirth",
            releaseDate: new Date('2024-02-29'),
            type: "Videojuegos",
            platform: "PLAYSTATION",
            imageUrl: "https://picsum.photos/200/300?random=2",
            description: "Continue Cloud's journey in this reimagined classic."
        },
        {
            id: 3,
            title: "House of the Dragon S2",
            releaseDate: new Date('2024-06-01'),
            type: "Series",
            imageUrl: "https://picsum.photos/200/300?random=3",
            description: "The Targaryen civil war continues in this epic series."
        }
    ];

    constructor(private http: HttpClient) { }

    async getBooks(): Promise<Release[]> {
        try {
            const response = await firstValueFrom(
                this.http.get(`${this.GOOGLE_BOOKS_API}?q=subject:fiction&orderBy=newest&maxResults=10`)
            );

            return (response as any).items.map((book: any, index: number) => ({
                id: 1000 + index,
                title: book.volumeInfo.title,
                releaseDate: new Date(book.volumeInfo.publishedDate || new Date()),
                type: 'Libros',
                imageUrl: book.volumeInfo.imageLinks?.thumbnail || 'default-image-url',
                description: book.volumeInfo.description || 'No description available',
                authors: book.volumeInfo.authors || []
            }));
        } catch (error) {
            console.error('Error fetching books:', error);
            return [];
        }
    }

    async getReleases(type?: string, platform?: string): Promise<Release[]> {
        try {
            let filtered = [...this.releases];

            if (type === 'Libros') {
                const books = await this.getBooks();
                filtered = [...filtered, ...books];
            }

            if (type) {
                filtered = filtered.filter(release => release.type === type);
            }

            if (platform && platform !== 'TODAS') {
                filtered = filtered.filter(release => release.platform === platform);
            }

            return filtered;
        } catch (error) {
            console.error('Error getting releases:', error);
            return [];
        }
    }

    async searchReleases(query: string): Promise<Release[]> {
        try {
            const lowercaseQuery = query.toLowerCase();
            const books = await this.getBooks();
            const allReleases = [...this.releases, ...books];

            return allReleases.filter(release =>
                release.title.toLowerCase().includes(lowercaseQuery) ||
                release.description.toLowerCase().includes(lowercaseQuery) ||
                release.authors?.some(author =>
                    author.toLowerCase().includes(lowercaseQuery)
                )
            );
        } catch (error) {
            console.error('Error searching releases:', error);
            return [];
        }
    }
}