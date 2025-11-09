"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  ClipboardListIcon,
  CrownIcon,
  ImageIcon,
  TablePropertiesIcon,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Info } from "@/components/tournament/Info";
import { participantsByTournament } from "@/mocks/tournamentsParticipants";
import { ParticipantList } from "@/components/tournament/ParticipantList";
import { SidebarInfo } from "@/components/tournament/SidebarInfo";
import { WinnersInfo } from "@/components/tournament/WinnersInfo";
import { OrganizerInfo } from "@/components/tournament/OrganizerInfo";
import { Qualification } from "@/components/tournament/ Qualification";
import { PlayoffBracket } from "@/components/tournament/PlayoffBracket";
import { tournaments } from "@/mocks/tournaments";
import { getTournamentTitle, getTournamentWinners } from "@/models/tournament";
import { PhotoGallery } from "@/components/tournament/PhotoGallery";
import { tournamentPhotosByTournament } from "@/mocks/tournamentPhotos";
import { useParams } from "next/navigation";
import Link from "next/link";

const tabs = [
  {
    value: "info",
    Icon: ClipboardListIcon,
    text: "Информация",
  },
  {
    value: "group_stage",
    Icon: TablePropertiesIcon,
    text: "Групповая стадия",
  },
  {
    value: "play_off",
    Icon: CrownIcon,
    text: "Плей-офф",
  },
  {
    value: "photos",
    Icon: ImageIcon,
    text: "Фотографии",
  },
];

const TournamentDetail = () => {
  const { tournament: id } = useParams();

  // Здесь в реальном приложении бы загружались данные по ID
  const data = useMemo(
    () => tournaments.find((tournament) => tournament.id === Number(id)),
    [id]
  );

  const [activeTab, setActiveTab] = useState("info");

  if (!data) return null;

  const { type, rating } = data;

  const participants1 = participantsByTournament[data.id];
  const tournamentPhotos = tournamentPhotosByTournament[data.id] || [];

  const winners = getTournamentWinners(data.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <Navigation />

      {/* Header */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          <Button asChild variant="ghost" className="mb-4 px-0">
            <Link href="/tournaments">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Назад к турнирам
            </Link>
          </Button>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <h1 className="text-2xl md:text-2xl lg:text-4xl font-bold text-gray-900 mb-2">
              {getTournamentTitle({ type, rating })}
            </h1>

            {/* {tournament.status === 'Регистрация открыта' && (
              <Button asChild size="lg" className="bg-tennis-green hover:bg-tennis-dark-green">
                <Link to="/register">
                  Зарегистрироваться
                  <Star className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )} */}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div
          className={cn(
            "grid gap-8",
            activeTab !== "play_off1" && "xl:grid-cols-3"
          )}
        >
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs
              orientation="vertical"
              defaultValue="info"
              className="space-y-6"
              onValueChange={setActiveTab}
            >
              <TabsList className="w-full justify-start gap-4">
                {/* <TabsTrigger value="info"><ClipboardListIcon className="h-5 w-5 mr-1" /> Информация</TabsTrigger>
                <TabsTrigger value="group_stage"><TablePropertiesIcon/>Групповая стадия</TabsTrigger>
                <TabsTrigger value="play_off"><CrownIcon />Плей-офф</TabsTrigger>
                <TabsTrigger value="photos"><ImageIcon/> Фотографии</TabsTrigger> */}
                {tabs.map(({ value, text, Icon }) => (
                  <TabsTrigger key={value} value={value}>
                    <Icon className="shrink-0 h-5 w-5 md:mr-1" />
                    <span className="hidden md:block">{text}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="info" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>О турнире</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Info tournament={data} participants={participants1} />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Зарегистрированные участники</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-5">
                      <ParticipantList participants={participants1} />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="group_stage">
                <Card>
                  <CardHeader>
                    <CardTitle>Группы квалификации</CardTitle>
                    <CardDescription>
                      Результаты матчей групповой стадии
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* <TournamentGroups tournament={data} /> */}
                      <Qualification tournamentId={data.id} />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="play_off">
                <Card>
                  <CardHeader>
                    <CardTitle>Плей-офф</CardTitle>
                    <CardDescription>Матчи на вылет</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <PlayoffBracket tournamentId={Number(id)} />
                      {/* <PlayOff /> */}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="photos">
                <Card>
                  <CardHeader>
                    <CardTitle>Фотографии с турнира</CardTitle>
                    <CardDescription>
                      Лучшие моменты турнира в фотографиях
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {tournamentPhotos.length > 0 ? (
                      <PhotoGallery photos={tournamentPhotos} />
                    ) : (
                      <div className="text-center py-12 text-gray-500">
                        <p>Фотографии с турнира пока не загружены</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {!!winners?.length && (
              <Card>
                <CardHeader>
                  <CardTitle>Призеры</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <WinnersInfo winners={winners} />
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Основная информация</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <SidebarInfo tournament={data} participants={participants1} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Контакты</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <OrganizerInfo {...data.organaizer} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentDetail;
