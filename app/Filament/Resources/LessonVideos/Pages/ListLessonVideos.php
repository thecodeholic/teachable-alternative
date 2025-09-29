<?php

namespace App\Filament\Resources\LessonVideos\Pages;

use App\Filament\Resources\LessonVideos\LessonVideoResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListLessonVideos extends ListRecords
{
    protected static string $resource = LessonVideoResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
